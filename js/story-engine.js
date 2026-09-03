/**
 * story-engine.js
 * --------------
 * Controla la narrativa del proyecto: renderiza nodos, media, interacciones y
 * el recorrido del usuario. La lógica se mantiene intacta, pero ahora está mejor
 * organizada para lectura y mantenimiento profesional.
 */

import { Viewer } from '@photo-sphere-viewer/core';
import { CubemapVideoAdapter } from '@photo-sphere-viewer/cubemap-video-adapter';
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter';
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin';

(() => {
  // Se cargan los datos narrativos y los elementos del DOM que se actualizan al recorrer la historia.
  const story = window.VECI_STORY || {};
  const passageEl = document.querySelector('#passage');
  const tagEl = document.querySelector('#passage-tag');
  const idEl = document.querySelector('#passage-id');
  const visitedEl = document.querySelector('#visited-count');
  const locationEl = document.querySelector('#story-location strong');
  const trailDialog = document.querySelector('#trail-dialog');
  const trailList = document.querySelector('#trail-list');

  const params = new URLSearchParams(window.location.search);
  const allowedLocations = new Set(['Engativá', 'Kennedy', 'Bosa']);
  const requestedLocation = params.get('localidad');
  const selectedLocation = allowedLocations.has(requestedLocation) ? requestedLocation : null;
  const trail = [];
  let currentNode = selectedLocation ? 'PUNTO_ELEGIDO' : 'Start';
  let activeViewer = null;

  // Si la historia pertenece a una localidad, se usa su material multimedia asociado.
  function resolveLocalityMedia(nodeName) {
    if (!selectedLocation) return story[nodeName]?.media || null;

    const localityMedia = window.VECI_LOCALITY_MEDIA?.[selectedLocation];
    if (!localityMedia) return story[nodeName]?.media || null;

    if (nodeName === 'PUNTO_ELEGIDO') {
      return {
        type: 'video',
        src: localityMedia.intro,
        caption: localityMedia.caption || `VIDEO / ${selectedLocation.toUpperCase()}`,
        poster: ''
      };
    }

    return story[nodeName]?.media || null;
  }

  // La localidad real se guarda para la lógica interna (material 360° por zona),
  // pero no se muestra en pantalla: el recorrido es rizomático y no debe delatar
  // desde el inicio en qué punto de entrada está la persona.
  if (selectedLocation) {
    sessionStorage.setItem('veci.localidad', selectedLocation);
  }

  // Escapa cadenas para evitar inyección HTML dentro de contenido dinámico.
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  // Destruye el visor 360° abierto para liberar recursos al cambiar de nodo.
  function destroyActiveMedia() {
    if (activeViewer) {
      activeViewer.destroy();
      activeViewer = null;
    }
  }

  // Convierte los placeholders tipo [VIDEO: ...] en bloques visuales legibles.
  function renderMediaPlaceholders(html) {
    return html.replace(/<p><em>\[([^\]]+)\]<\/em><\/p>/gi, (_, label) => {
      const [typePart, ...descriptionParts] = label.split(':');
      const type = (typePart || 'ARCHIVO').trim();
      const description = descriptionParts.join(':').trim() || 'Contenido multimedia pendiente';
      return `
        <div class="media-placeholder">
          <span>${escapeHtml(type)}</span>
          <p>${escapeHtml(description)}</p>
          <small>Espacio reservado para el recurso multimedia definitivo.</small>
        </div>`;
    });
  }

  // Genera el HTML final del contenido multimedia asociado a cada nodo.
  function mediaHtml(media, nodeName) {
    if (!media?.type) return '';
    if (media.type !== 'comparison' && !media?.src) return '';

    const caption = media.caption
      ? `<figcaption>${escapeHtml(media.caption)}</figcaption>`
      : '';

    if (media.type === 'image') {
      return `<figure class="story-media"><img class="story-media__image" src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt || '')}">${caption}</figure>`;
    }

    if (media.type === 'audio') {
      return `<figure class="story-media"><audio class="story-media__audio" controls preload="metadata" src="${escapeHtml(media.src)}"></audio>${caption}</figure>`;
    }

    if (media.type === 'video') {
      const poster = media.poster ? ` poster="${escapeHtml(media.poster)}"` : '';
      return `<figure class="story-media"><video class="story-media__video" controls preload="metadata" muted playsinline${poster} src="${escapeHtml(media.src)}"></video>${caption}</figure>`;
    }

    if (media.type === 'comparison') {
      return `
        <figure class="story-media story-media--comparison">
          <div class="compare" id="compare-${escapeHtml(nodeName)}">
            <img class="compare__img compare__img--after" src="${escapeHtml(media.after)}" alt="">
            <div class="compare__before-wrap">
              <img class="compare__img compare__img--before" src="${escapeHtml(media.before)}" alt="">
            </div>
            <div class="compare__handle" role="slider" tabindex="0" aria-label="Deslizador antes y ahora" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
              <span class="compare__handle-grip">↔</span>
            </div>
            <span class="compare__tag compare__tag--before">${escapeHtml(media.beforeLabel || 'ANTES')}</span>
            <span class="compare__tag compare__tag--after">${escapeHtml(media.afterLabel || 'AHORA')}</span>
          </div>
          ${caption}
        </figure>`;
    }

    if (media.type === 'video360') {
      return `
        <figure class="story-media story-media--360">
          <div class="story-360-head">
            <span>360°</span>
            <p>Arrastra para mirar alrededor</p>
          </div>
          <div id="viewer-360-${escapeHtml(nodeName)}" class="story-360-viewer" aria-label="Video interactivo 360 grados"></div>
          ${caption}
        </figure>`;
    }

    return '';
  }

  // Activa el deslizador antes/ahora si el nodo lo requiere.
  function initComparisonSlider(nodeName) {
    const root = document.querySelector(`#compare-${CSS.escape(nodeName)}`);
    if (!root) return;

    const beforeWrap = root.querySelector('.compare__before-wrap');
    const beforeImg = root.querySelector('.compare__before-wrap .compare__img');
    const handle = root.querySelector('.compare__handle');

    // La imagen "antes" debe mantener el ancho completo del contenedor aunque
    // el recorte (before-wrap) se achique, para que solo se vea una ventana
    // hacia la imagen y no se comprima.
    const syncWidth = () => { beforeImg.style.width = `${root.getBoundingClientRect().width}px`; };
    syncWidth();
    window.addEventListener('resize', syncWidth);

    const setPosition = (percent) => {
      const clamped = Math.min(100, Math.max(0, percent));
      beforeWrap.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;
      handle.setAttribute('aria-valuenow', String(Math.round(clamped)));
    };

    const percentFromClientX = (clientX) => {
      const rect = root.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };

    let dragging = false;
    const start = () => { dragging = true; };
    const stop = () => { dragging = false; };
    const move = (clientX) => { if (dragging) setPosition(percentFromClientX(clientX)); };

    handle.addEventListener('pointerdown', (e) => { start(); handle.setPointerCapture(e.pointerId); });
    root.addEventListener('pointermove', (e) => move(e.clientX));
    root.addEventListener('pointerup', stop);
    root.addEventListener('pointerleave', stop);

    // Clic directo en cualquier parte de la imagen también mueve el deslizador.
    root.addEventListener('click', (e) => setPosition(percentFromClientX(e.clientX)));

    // Accesibilidad: flechas de teclado cuando el deslizador tiene foco.
    handle.addEventListener('keydown', (e) => {
      const current = parseFloat(handle.getAttribute('aria-valuenow') || '50');
      if (e.key === 'ArrowLeft') setPosition(current - 5);
      if (e.key === 'ArrowRight') setPosition(current + 5);
    });

    setPosition(50);
  }

  // Inicializa el visor 360° si el nodo lo requiere.
  function initMedia(media, nodeName) {
    if (!media) return;

    if (media.type === 'comparison') {
      initComparisonSlider(nodeName);
      return;
    }

    if (media.type !== 'video360') return;

    const container = document.querySelector(`#viewer-360-${CSS.escape(nodeName)}`);
    if (!container) return;

    const isEac = (media.projection || '').toLowerCase() === 'eac';
    const Adapter = isEac ? CubemapVideoAdapter : EquirectangularVideoAdapter;
    const panorama = isEac
      ? { source: media.src, equiangular: true }
      : { source: media.src };

    try {
      activeViewer = new Viewer({
        container,
        adapter: Adapter,
        panorama,
        plugins: [VideoPlugin],
        defaultZoomLvl: 35,
        navbar: false,
        caption: media.caption || 'Video 360°',
      });
    } catch (error) {
      console.error('No fue posible iniciar el visor 360°:', error);
      container.innerHTML = `
        <div class="story-360-error">
          <strong>No se pudo iniciar el visor 360°.</strong>
          <span>Abre el proyecto con Live Server y verifica la conexión a Internet.</span>
        </div>`;
    }
  }

  // Añade interacciones personalizadas a nodos específicos sin tocar el contenido principal.
  function applyInteractions(name, html) {
    if (name === 'MEMORIA') {
      html = html.replace(
        /<p><em>\[INTERACCIÓN: escribe una palabra\]<\/em><\/p>/i,
        `<label class="story-input"><span>Escribe una palabra que recuerdes</span><input id="memory-word" maxlength="40" autocomplete="off" placeholder="Ej. confianza"></label>`
      );
    }

    if (name === 'RESPONDER') {
      html = html.replace(
        /<p><em>\[INTERACCIÓN: campo de texto\]<\/em><\/p>/i,
        `<label class="story-input"><span>¿Qué responderías?</span><input id="response-word" maxlength="80" autocomplete="off" placeholder="Escribe tu respuesta"></label>`
      );
    }

    if (name === 'FINAL') {
      html = html.replace(
        /<p><em>\[AQUÍ SE REVELA LA LOCALIDAD REAL DEL PUNTO\]<\/em><\/p>/i,
        `<div class="locality-reveal"><span>Se abre una puerta</span><strong>Entrada</strong></div>`
      );
    }

    if (name === 'Start' && !selectedLocation) {
      return `
        <div class="story-start">
          <p class="eyebrow">Ciudades expandidas</p>
          <h1>¿VECI?</h1>
          <p>Hay lugares que conocemos por su dirección. Otros, por lo que ocurre en ellos.</p>
          <p><strong>Elige una entrada.</strong></p>
          <div class="locality-choices">
            <a href="story.html?localidad=Engativ%C3%A1">Entrada 01 <b>↗</b></a>
            <a href="story.html?localidad=Kennedy">Entrada 02 <b>↗</b></a>
            <a href="story.html?localidad=Bosa">Entrada 03 <b>↗</b></a>
          </div>
        </div>`;
    }

    return html;
  }

  // Guarda campos de texto si el usuario escribe algo mientras avanza en la experiencia.
  function saveInteractionValues() {
    const memoryInput = document.querySelector('#memory-word');
    const responseInput = document.querySelector('#response-word');
    if (memoryInput?.value.trim()) sessionStorage.setItem('veci.memoria', memoryInput.value.trim());
    if (responseInput?.value.trim()) sessionStorage.setItem('veci.respuesta', responseInput.value.trim());
  }

  // Crea la navegación entre opciones del nodo actual.
  function choicesHtml(choices = []) {
    if (!choices.length) return '';
    return `<nav class="story-choices" aria-label="Opciones del recorrido">${choices.map(choice => `
      <a href="#${encodeURIComponent(choice.target)}" class="story-choice" data-target="${escapeHtml(choice.target)}">
        <span>${escapeHtml(choice.label)}</span><b aria-hidden="true">↗</b>
      </a>`).join('')}</nav>`;
  }

  // Renderiza cada nodo de la historia y actualiza el estado visible en pantalla.
  function render(name, updateHash = true) {
    const node = story[name];
    if (!node) {
      destroyActiveMedia();
      passageEl.innerHTML = `<h2>Nodo no encontrado.</h2><p>La sección <strong>${escapeHtml(name)}</strong> no existe.</p><a class="story-choice" href="index.html"><span>Volver al mapa</span><b>←</b></a>`;
      return;
    }

    saveInteractionValues();
    destroyActiveMedia();
    currentNode = name;
    if (trail.at(-1) !== name) trail.push(name);

    visitedEl.textContent = String(new Set(trail).size).padStart(2, '0');
    idEl.textContent = name.replaceAll('_', ' ');
    tagEl.textContent = String(node.tag || 'narrativa').toUpperCase();

    const resolvedMedia = resolveLocalityMedia(name) || node.media;
    let html = applyInteractions(name, node.html || '');
    html = renderMediaPlaceholders(html);
    passageEl.innerHTML = html + mediaHtml(resolvedMedia, name) + choicesHtml(node.choices);

    const memoryInput = document.querySelector('#memory-word');
    const responseInput = document.querySelector('#response-word');
    if (memoryInput) memoryInput.value = sessionStorage.getItem('veci.memoria') || '';
    if (responseInput) responseInput.value = sessionStorage.getItem('veci.respuesta') || '';

    initMedia(resolvedMedia, name);

    if (updateHash && name !== 'Start') history.replaceState(null, '', `#${encodeURIComponent(name)}`);
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  passageEl.addEventListener('click', (event) => {
    const link = event.target.closest('[data-target]');
    if (!link) return;
    event.preventDefault();
    render(link.dataset.target);
  });

  document.querySelector('#toggle-trail')?.addEventListener('click', () => {
    trailList.innerHTML = trail.map((node, index) => `
      <li><button type="button" data-jump="${escapeHtml(node)}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(node.replaceAll('_', ' '))}</button></li>`).join('');
    trailDialog.showModal();
  });

  trailList?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-jump]');
    if (!button) return;
    trailDialog.close();
    render(button.dataset.jump);
  });

  window.addEventListener('hashchange', () => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && hash !== currentNode && story[hash]) render(hash, false);
  });

  window.addEventListener('beforeunload', destroyActiveMedia);

  const initialHash = decodeURIComponent(window.location.hash.slice(1));
  render(initialHash && story[initialHash] ? initialHash : currentNode, false);
})();
