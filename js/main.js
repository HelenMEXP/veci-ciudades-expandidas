/**
 * main.js
 * -----------------
 * Inicializa la portada, el mapa interactivo y la intro de carga.
 * Mantiene la funcionalidad actual intacta y añade comentarios claros para
 * facilitar mantenimiento y futuras modificaciones.
 */

// Datos principales del mapa: cada localidad representa una entrada a la narrativa.
const localities = [
  { name: 'Engativá', coords: [4.7045, -74.1138], number: '01', note: 'Cruces, comercio y memoria' },
  { name: 'Kennedy', coords: [4.6275, -74.1511], number: '02', note: 'Barrio, trayecto y encuentro' },
  { name: 'Bosa', coords: [4.6219, -74.1894], number: '03', note: 'Orillas, voces y resistencia' }
];

// Construye la URL de cada historia para llevar la localidad seleccionada.
function buildStoryUrl(name) {
  return `story.html?localidad=${encodeURIComponent(name)}`;
}

// Inicializa el mapa de Bogotá y sus marcadores interactivos.
function initializeMap() {
  const mapRoot = document.querySelector('#bogota-map');
  if (!window.L || !mapRoot) return;

  const map = L.map('bogota-map', {
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false
  }).setView([4.665, -74.145], 11.7);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Capa base del mapa: se mantiene limpia para que la identidad visual del sitio
  // destaque sin saturar la lectura ni competir con la narrativa.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: false,
    noWrap: true
  }).addTo(map);

  // Genera el icono visual para cada punto del mapa.
  const nodeIcon = (place) => L.divIcon({
    className: 'veci-marker-wrap',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    html: `<a class="veci-marker" href="${buildStoryUrl(place.name)}" data-place="${place.name}" aria-label="Entrar a la narrativa por ${place.name}"><span class="veci-marker__pulse"></span><span class="veci-marker__dot"></span></a>`
  });

  localities.forEach((place) => {
    L.marker(place.coords, { icon: nodeIcon(place), keyboard: true }).addTo(map);
  });

  mapRoot.addEventListener('click', (event) => {
    const entry = event.target.closest('.veci-marker');
    if (!entry) return;

    const locality = localities.find((place) => place.name === entry.dataset.place);
    if (!locality) return;

    const instruction = document.querySelector('.map-instruction');
    if (!instruction) return;

    instruction.innerHTML = `Entrando por: <strong>${locality.name}</strong><br /><span>${locality.note}</span>`;
  });
}

// Controla la pantalla de carga inicial con el video de presentación.
function initializePreloader() {
  const preloader = document.querySelector('#preloader');
  if (!preloader) return;

  const video = preloader.querySelector('video');
  if (!video) return;

  const hidePreloader = () => {
    preloader.classList.add('preloader--hidden');
    window.setTimeout(() => {
      preloader.style.display = 'none';
    }, 700);
  };

  // La intro sigue con sonido, pero no se oculta prematuramente. La pantalla solo
  // desaparece cuando el video termina su reproducción o si el navegador bloquea
  // autoplay y se fuerza una salida segura.
  video.muted = false;
  video.volume = 0.8;
  video.defaultMuted = false;

  video.addEventListener('ended', hidePreloader, { once: true });

  video.play().catch(() => {
    window.setTimeout(hidePreloader, 1800);
  });
}

initializeMap();
initializePreloader();
