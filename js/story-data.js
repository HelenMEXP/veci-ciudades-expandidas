// Datos narrativos editables del proyecto ¿VECI?
// Cada nodo contiene HTML, opciones de navegación y, si hace falta,
// un media específico para ese tramo de la historia.
//
// Esta sección es central para la experiencia: aquí se asocian los videos de
// entrada de cada localidad con su nombre para que el sistema los cargue según
// la selección del usuario. Se conserva el contenido existente y se documenta
// para facilitar mantenimiento y futuras sustituciones de medios.
//
// Para cada localidad puedes meter aquí su video definitivo.
// Ejemplo:
//   "Engativá": { "intro": "assets/video/engativa.mp4", "caption": "VIDEO 360° / ENGATIVÁ" }
//   "Kennedy": { "intro": "assets/video/kennedy.mp4", "caption": "VIDEO 360° / KENNEDY" }
//   "Bosa": { "intro": "assets/video/bosa.mp4", "caption": "VIDEO 360° / BOSA" }
window.VECI_LOCALITY_MEDIA = {
  "Engativá": {
    intro: "assets/video/En.mp4",
    caption: "VIDEO / ENGATIVÁ"
  },
  "Kennedy": {
    intro: "assets/video/Ke.mp4",
    caption: "VIDEO / KENNEDY"
  },
  "Bosa": {
    intro: "assets/video/bosa-demo.mp4",
    caption: "VIDEO 360° / BOSA"
  }
};

window.VECI_STORY = {
  "Start": {
    "tag": "narrativa",
    "html": "<div class=\"cover\">\n<span class=\"eyebrow\">CIUDADES EXPANDIDAS</span>\n<h1>¿VECI?</h1>\n<p>Hay lugares que conocemos por su dirección. Otros, por lo que ocurre en ellos.</p>\n<p><strong>Elige un punto.</strong></p>\n</div>",
    "choices": [
      {
        "label": "●",
        "target": "PUNTO_ELEGIDO"
      },
      {
        "label": "●",
        "target": "PUNTO_ELEGIDO"
      },
      {
        "label": "●",
        "target": "PUNTO_ELEGIDO"
      }
    ]
  },
  "PUNTO_ELEGIDO": {
    "tag": "narrativa",
    "html": "<h2>No sabes dónde estás.</h2>\n<p>Solo sabes que son las <strong>3:00 PM</strong>.</p>",
    "choices": [
      {
        "label": "Entrar",
        "target": "TRES_PM"
      }
    ]
  },
  "TRES_PM": {
    "tag": "narrativa",
    "html": "<span class=\"tag-tiempo\">3:00 PM</span>\n<h2>La ciudad todavía está despierta.</h2>\n<p>Muévete dentro del video: arrastra con el mouse o con el dedo para mirar alrededor.</p>\n<p><strong>¿Qué viste primero?</strong></p>",
    "media": {
      "type": "video360",
      "projection": "eac",
      "src": "assets/video/wunder360-eac-demo-h264.mp4",
      "caption": "VIDEO 360° / ARRASTRA PARA EXPLORAR EL ESPACIO"
    },
    "choices": [
      {
        "label": "La tienda",
        "target": "TIENDA"
      },
      {
        "label": "La calle",
        "target": "CALLE"
      },
      {
        "label": "Las personas",
        "target": "PERSONAS"
      }
    ]
  },
  "TIENDA": {
    "tag": "narrativa",
    "html": "<span class=\"tag-tienda\">TIENDA</span>\n<h2>Encuentras una tienda.</h2>\n<p>Explora la imagen.</p>",
    "media": {
      "type": "image",
      "src": "assets/images/tienda-fachada.jpg",
      "alt": "Fachada de una tienda de barrio, vista tras la reja de la casa",
      "caption": "FOTO / FACHADA DE TIENDA DE BARRIO"
    },
    "choices": [
      {
        "label": "La fachada",
        "target": "FACHADA"
      },
      {
        "label": "Un aviso",
        "target": "AVISOS"
      },
      {
        "label": "La nevera",
        "target": "NEVERA"
      },
      {
        "label": "La entrada",
        "target": "ENTRADA"
      }
    ]
  },
  "CALLE": {
    "tag": "narrativa",
    "html": "<span class=\"tag-calle\">CALLE</span>\n<h2>La calle está llena.</h2>\n<p>¿Qué quieres seguir?</p>",
    "media": {
      "type": "image",
      "src": "assets/images/carrito-calle.jpg",
      "alt": "Carrito de venta ambulante en una calle de Bogotá, edificios residenciales al fondo",
      "caption": "FOTO / CALLE ACTIVA"
    },
    "choices": [
      {
        "label": "El tráfico",
        "target": "TRAFICO"
      },
      {
        "label": "Una persona",
        "target": "VECINO"
      },
      {
        "label": "La tienda",
        "target": "TIENDA"
      },
      {
        "label": "Un sonido",
        "target": "SONIDO"
      }
    ]
  },
  "PERSONAS": {
    "tag": "narrativa",
    "html": "<h2>Las personas.</h2>\n<p>¿Quién hace que este lugar se sienta habitado?</p>",
    "choices": [
      {
        "label": "El vecino",
        "target": "VECINO"
      },
      {
        "label": "El tendero",
        "target": "TENDERO"
      },
      {
        "label": "El vendedor",
        "target": "VENDEDOR"
      }
    ]
  },
  "FACHADA": {
    "tag": "narrativa",
    "html": "<h2>La fachada.</h2>\n<p>Busca una señal de que aquí hay barrio.</p>",
    "media": {
      "type": "image",
      "src": "assets/images/tienda-fachada.jpg",
      "alt": "Fachada de una tienda de barrio, vista tras la reja de la casa",
      "caption": "FOTO INTERACTIVA / FACHADA"
    },
    "choices": [
      {
        "label": "Un aviso",
        "target": "AVISOS"
      },
      {
        "label": "Una persona",
        "target": "TENDERO"
      },
      {
        "label": "Un color",
        "target": "COLORES"
      }
    ]
  },
  "AVISOS": {
    "tag": "narrativa",
    "html": "<span class=\"tag-barrio\">LENGUAJE</span>\n<h2>Los avisos también hablan.</h2>\n<p><em>[FOTO: avisos y carteles]</em></p>\n<p>¿Cuál leerías primero?</p>",
    "choices": [
      {
        "label": "¿Veci?",
        "target": "FRASES"
      },
      {
        "label": "Me regala...",
        "target": "ME_REGALA"
      },
      {
        "label": "A la orden.",
        "target": "VENDEDOR"
      },
      {
        "label": "¿Qué necesita?",
        "target": "TENDERO"
      }
    ]
  },
  "NEVERA": {
    "tag": "narrativa",
    "html": "<h2>La nevera de la esquina.</h2>\n<p><em>[FOTO: nevera/productos]</em></p>\n<p>No es solamente una nevera.</p>\n<p>¿Qué aparece en tu cabeza?</p>",
    "choices": [
      {
        "label": "Un producto",
        "target": "PRODUCTOS"
      },
      {
        "label": "Una persona",
        "target": "VECINO"
      },
      {
        "label": "Una tienda que recuerdas",
        "target": "MEMORIA"
      }
    ]
  },
  "ENTRADA": {
    "tag": "narrativa",
    "html": "<h2>Entras.</h2>\n<p><em>[AUDIO: puerta + ambiente interior]</em></p>\n<p>Una voz aparece antes que la imagen:</p>\n<p><strong>“¿Veci?”</strong></p>",
    "choices": [
      {
        "label": "Acercarte",
        "target": "TENDERO"
      },
      {
        "label": "Responder",
        "target": "RESPONDER"
      },
      {
        "label": "Seguir mirando",
        "target": "PRODUCTOS"
      }
    ]
  },
  "TRAFICO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">CIUDAD</span>\n<h2>El tráfico.</h2>\n<p>Hay sonidos que llegan antes que las personas.</p>",
    "media": {
      "type": "image",
      "src": "assets/images/trafico-interseccion.jpg",
      "alt": "Intersección concurrida de Bogotá con TransMilenio, carros y motos",
      "caption": "FOTO / TRÁFICO — Wikimedia Commons, revisar atribución (falta el audio de motores)"
    },
    "choices": [
      {
        "label": "Seguir el ruido",
        "target": "SONIDO"
      },
      {
        "label": "Buscar una voz",
        "target": "UNA_VOZ"
      },
      {
        "label": "Cerrar los ojos",
        "target": "SILENCIO"
      }
    ]
  },
  "VECINO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">COMUNIDAD</span>\n<h2>El vecino.</h2>\n<p>Lo ves entrar. El tendero ya sabe qué va a pedir.</p>\n<p>¿Qué crees que va a comprar?</p>",
    "choices": [
      {
        "label": "Un producto",
        "target": "PRODUCTOS"
      },
      {
        "label": "Lo de siempre",
        "target": "LO_DE_SIEMPRE"
      },
      {
        "label": "Seguirlo",
        "target": "SEGUIR_VECINO"
      }
    ]
  },
  "SONIDO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-audio\">SONIDO</span>\n<h2>No mires. Escucha.</h2>\n<p><em>[AUDIO: paisaje sonoro real]</em></p>\n<p>¿Qué apareció primero?</p>",
    "choices": [
      {
        "label": "Una voz",
        "target": "UNA_VOZ"
      },
      {
        "label": "Una moto",
        "target": "TRAFICO"
      },
      {
        "label": "Una música",
        "target": "MUSICA"
      },
      {
        "label": "Nada",
        "target": "SILENCIO"
      }
    ]
  },
  "TENDERO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-persona\">PERSONA</span>\n<h2>La voz del tendero.</h2>\n<p><em>[VIDEO/TESTIMONIO: tendero]</em></p>\n<p>“¿Lo de siempre?”</p>\n<p>¿Qué quieres preguntarle?</p>",
    "choices": [
      {
        "label": "Por la tienda",
        "target": "HISTORIA_TIENDA"
      },
      {
        "label": "Por el barrio",
        "target": "HISTORIA_BARRIO"
      },
      {
        "label": "Por lo que ha cambiado",
        "target": "CAMBIOS"
      }
    ]
  },
  "VENDEDOR": {
    "tag": "narrativa",
    "html": "<span class=\"tag-barrio\">CALLE</span>\n<h2>Una voz atraviesa la calle.</h2>\n<p><strong>“¡Mazamorra paisa!”</strong></p>\n<p><small>Foto propia — todavía falta el video/audio real de esta voz.</small></p>",
    "media": {
      "type": "image",
      "src": "assets/images/vendedor-informal.jpg",
      "alt": "Carrito de venta informal de frutas y verduras en la calle",
      "caption": "FOTO / VENDEDOR INFORMAL"
    },
    "choices": [
      {
        "label": "Seguir la voz",
        "target": "SEGUIR_VOZ"
      },
      {
        "label": "Comprar",
        "target": "COMPRAR"
      },
      {
        "label": "Seguir caminando",
        "target": "CALLE"
      }
    ]
  },
  "COLORES": {
    "tag": "narrativa",
    "html": "<span class=\"tag-barrio\">COLORES</span>\n<h2>El barrio también se reconoce por cómo se ve.</h2>\n<p><em>[FOTO INTERACTIVA: colores, avisos, fachadas]</em></p>\n<p>Encuentra tres colores que no pertenezcan a la misma marca.</p>",
    "choices": [
      {
        "label": "Terminé",
        "target": "PAISAJE_COLORES"
      }
    ]
  },
  "FRASES": {
    "tag": "narrativa",
    "html": "<span class=\"tag-barrio\">FRASES</span>\n<h2>Palabras de barrio.</h2>",
    "choices": [
      {
        "label": "“¿Veci?”",
        "target": "UNA_VOZ"
      },
      {
        "label": "“Me regala...”",
        "target": "ME_REGALA"
      },
      {
        "label": "“A la orden.”",
        "target": "VENDEDOR"
      },
      {
        "label": "“¿Qué necesita?”",
        "target": "TENDERO"
      }
    ]
  },
  "ME_REGALA": {
    "tag": "narrativa",
    "html": "<h2>“Me regala...”</h2>\n<p><em>[AUDIO: frase real]</em></p>\n<p>La frase continúa en la tienda.</p>",
    "choices": [
      {
        "label": "Elegir un producto",
        "target": "PRODUCTOS"
      },
      {
        "label": "Escuchar al tendero",
        "target": "TENDERO"
      }
    ]
  },
  "PRODUCTOS": {
    "tag": "narrativa",
    "html": "<h2>Los productos.</h2>\n<p><em>[FOTO INTERACTIVA: productos de tienda]</em></p>\n<p>Este producto también tiene una historia.</p>\n<p>¿Quién podría comprarlo?</p>",
    "choices": [
      {
        "label": "Un vecino",
        "target": "VECINO"
      },
      {
        "label": "Alguien que pasa",
        "target": "CALLE"
      },
      {
        "label": "Alguien que vuelve",
        "target": "LO_DE_SIEMPRE"
      }
    ]
  },
  "LO_DE_SIEMPRE": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">CONFIANZA</span>\n<h2>“Lo de siempre.”</h2>\n<p>¿Qué hace posible que alguien pueda decir eso?</p>",
    "choices": [
      {
        "label": "Conocer",
        "target": "HISTORIA_BARRIO"
      },
      {
        "label": "Confiar",
        "target": "FIADO"
      },
      {
        "label": "Recordar",
        "target": "MEMORIA"
      }
    ]
  },
  "MEMORIA": {
    "tag": "narrativa",
    "html": "<span class=\"tag-memoria\">MEMORIA</span>\n<h2>Una tienda también vive en lo que recordamos.</h2>\n<p>¿Hay una tienda que recuerdes?</p>\n<p><em>[INTERACCIÓN: escribe una palabra]</em></p>",
    "choices": [
      {
        "label": "Guardar el recuerdo",
        "target": "RECUERDO"
      },
      {
        "label": "Buscar otra historia",
        "target": "HISTORIA_TIENDA"
      }
    ]
  },
  "RECUERDO": {
    "tag": "narrativa",
    "html": "<h2>Guárdalo.</h2>\n<p>Tu palabra queda como una pequeña huella dentro del recorrido.</p>",
    "choices": [
      {
        "label": "Volver a la tienda",
        "target": "TIENDA"
      },
      {
        "label": "Seguir",
        "target": "RESISTENCIA"
      }
    ]
  },
  "SEGUIR_VECINO": {
    "tag": "narrativa",
    "html": "<h2>Sigues al vecino.</h2>\n<p>El recorrido puede llevarte a otro lugar.</p>",
    "media": {
      "type": "video",
      "src": "assets/video/seguir-vecino-bosa.mp4",
      "caption": "VIDEO / RECORRIDO EN BOSA — puestos informales y tramos sin ninguna tienda"
    },
    "choices": [
      {
        "label": "Entrar",
        "target": "TIENDA"
      },
      {
        "label": "Seguir",
        "target": "CALLE"
      },
      {
        "label": "Regresar",
        "target": "VECINO"
      }
    ]
  },
  "UNA_VOZ": {
    "tag": "narrativa",
    "html": "<span class=\"tag-audio\">VOZ</span>\n<h2>Una voz.</h2>\n<p><em>[AUDIO: “¿Veci?”]</em></p>\n<p>La voz no te dijo dónde estás. Pero quizá ya reconoces el lugar.</p>",
    "choices": [
      {
        "label": "Seguir la voz",
        "target": "TENDERO"
      },
      {
        "label": "Buscar su origen",
        "target": "SEGUIR_VOZ"
      },
      {
        "label": "Recordarla",
        "target": "MEMORIA"
      }
    ]
  },
  "MUSICA": {
    "tag": "narrativa",
    "html": "<span class=\"tag-audio\">MÚSICA</span>\n<h2>Una canción sale de algún lugar.</h2>\n<p><em>[AUDIO: música real del barrio]</em></p>",
    "choices": [
      {
        "label": "Seguirla",
        "target": "SEGUIR_MUSICA"
      },
      {
        "label": "Ignorarla",
        "target": "CALLE"
      },
      {
        "label": "Escucharla completa",
        "target": "ESCUCHAR_MUSICA"
      }
    ]
  },
  "SILENCIO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-silencio\">SILENCIO</span>\n<h2>No ocurre nada.</h2>\n<p><em>[AUDIO: ambiente mínimo]</em></p>\n<p>Quédate unos segundos.</p>",
    "choices": [
      {
        "label": "Quedarme",
        "target": "QUEDARSE_SILENCIO"
      },
      {
        "label": "Salir",
        "target": "CALLE"
      }
    ]
  },
  "RESPONDER": {
    "tag": "narrativa",
    "html": "<h2>Responde.</h2>\n<p>¿Qué responderías a un tendero que te dice “¿Veci?”</p>\n<p><em>[INTERACCIÓN: campo de texto]</em></p>\n<p>Tu respuesta también construye la conversación.</p>",
    "choices": [
      {
        "label": "Seguir",
        "target": "CONVERSACION"
      }
    ]
  },
  "CONVERSACION": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">CONVERSACIÓN</span>\n<h2>Una conversación puede durar dos minutos. Una historia puede durar años.</h2>\n<p>¿Qué quieres saber?</p>",
    "choices": [
      {
        "label": "Antes",
        "target": "HISTORIA_TIENDA"
      },
      {
        "label": "Ahora",
        "target": "CAMBIOS"
      },
      {
        "label": "Después",
        "target": "FUTURO"
      }
    ]
  },
  "HISTORIA_TIENDA": {
    "tag": "narrativa",
    "html": "<h2>La historia de la tienda.</h2>\n<p>¿Desde cuándo existe? ¿Qué ha visto cambiar?</p>",
    "media": {
      "type": "audio",
      "src": "assets/audio/entrevista-desaparicion-01.mp3",
      "caption": "AUDIO / ENTREVISTA REAL — LA DESAPARICIÓN DE LAS TIENDAS"
    },
    "choices": [
      {
        "label": "Ir al antes",
        "target": "ANTES"
      },
      {
        "label": "Volver al ahora",
        "target": "AHORA"
      }
    ]
  },
  "HISTORIA_BARRIO": {
    "tag": "narrativa",
    "html": "<h2>La historia del barrio.</h2>\n<p>¿Qué había antes?</p>",
    "media": {
      "type": "audio",
      "src": "assets/audio/entrevista-desaparicion-02.mp3",
      "caption": "AUDIO / ENTREVISTA REAL — LA DESAPARICIÓN DE LAS TIENDAS"
    },
    "choices": [
      {
        "label": "Antes",
        "target": "ANTES"
      },
      {
        "label": "Seguir",
        "target": "CAMBIOS"
      }
    ]
  },
  "CAMBIOS": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">TRANSFORMACIÓN</span>\n<h2>¿Qué ha cambiado?</h2>\n<p><em>[FOTO COMPARATIVA]</em></p>",
    "choices": [
      {
        "label": "Mirar el antes",
        "target": "ANTES"
      },
      {
        "label": "Mirar el ahora",
        "target": "AHORA"
      },
      {
        "label": "Comparar",
        "target": "COMPARACION"
      }
    ]
  },
  "ANTES": {
    "tag": "narrativa",
    "html": "<h2>Antes.</h2>\n<p>“Ahí quedaba una tienda.”</p>",
    "media": {
      "type": "image",
      "src": "assets/images/antes-guayacanes.jpg",
      "alt": "Avenida Guayacanes en Bosa antes de la urbanización, calle sin pavimentar",
      "caption": "FOTO / AVENIDA GUAYACANES, ANTES — Google Street View, 2013"
    },
    "choices": [
      {
        "label": "Quién la recuerda",
        "target": "MEMORIA"
      },
      {
        "label": "Por qué desapareció",
        "target": "DESAPARICION"
      },
      {
        "label": "Qué hay ahora",
        "target": "APARTAMENTOS"
      }
    ]
  },
  "AHORA": {
    "tag": "narrativa",
    "html": "<h2>Ahora.</h2>\n<p>La ciudad sigue creciendo.</p>",
    "media": {
      "type": "video",
      "src": "assets/video/ahora-obra.mp4",
      "caption": "VIDEO / OBRA EN CONSTRUCCIÓN — polisombras a lado y lado de la vía"
    },
    "choices": [
      {
        "label": "Mirar arriba",
        "target": "APARTAMENTOS"
      },
      {
        "label": "Mirar alrededor",
        "target": "MIRAR_ALREDEDOR"
      },
      {
        "label": "Buscar la tienda",
        "target": "OTRA_TIENDA"
      }
    ]
  },
  "COMPARACION": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">ANTES / AHORA</span>\n<h2>La misma calle. Otra ciudad.</h2>\n<p>Arrastra la línea para ver cómo cambió.</p>",
    "media": {
      "type": "comparison",
      "before": "assets/images/antes-guayacanes.jpg",
      "after": "assets/images/ahora-guayacanes.jpg",
      "beforeLabel": "ANTES · 2013",
      "afterLabel": "AHORA · 2023",
      "caption": "AVENIDA GUAYACANES, BOSA — la misma vía, sin ninguna tienda de barrio a la vista"
    },
    "choices": [
      {
        "label": "Seguir",
        "target": "TRANSFORMACION"
      }
    ]
  },
  "APARTAMENTOS": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">VERTICALIDAD</span>\n<h2>La ciudad crece hacia arriba.</h2>",
    "media": {
      "type": "image",
      "src": "assets/images/apartamentos-construccion.jpg",
      "alt": "Edificio en construcción en una esquina de Bogotá",
      "caption": "FOTO / EDIFICIOS EN CONSTRUCCIÓN"
    },
    "choices": [
      {
        "label": "Mirar abajo",
        "target": "MIRAR_ALREDEDOR"
      },
      {
        "label": "Preguntar quién vive ahí",
        "target": "VECINOS"
      },
      {
        "label": "Buscar la tienda",
        "target": "OTRA_TIENDA"
      }
    ]
  },
  "MIRAR_ALREDEDOR": {
    "tag": "narrativa",
    "html": "<h2>Mira alrededor.</h2>\n<p>¿Qué encuentras?</p>",
    "media": {
      "type": "image",
      "src": "assets/images/mirar-alrededor-barrio.jpg",
      "alt": "Calle de un barrio tradicional bogotano con casas de colores",
      "caption": "FOTO AMPLIA — Wikimedia Commons, revisar atribución"
    },
    "choices": [
      {
        "label": "Apartamentos",
        "target": "APARTAMENTOS"
      },
      {
        "label": "Centro comercial",
        "target": "CENTRO_COMERCIAL"
      },
      {
        "label": "Tienda",
        "target": "TIENDA"
      },
      {
        "label": "Tráfico",
        "target": "TRAFICO"
      }
    ]
  },
  "OTRA_TIENDA": {
    "tag": "narrativa",
    "html": "<h2>Buscas otra tienda.</h2>\n<p>Caminas. Pero encuentras otra cosa.</p>",
    "media": {
      "type": "image",
      "src": "assets/images/otra-tienda-kennedy.jpg",
      "alt": "Calle de un barrio de Kennedy sin comercio visible, día nublado",
      "caption": "FOTO / EL LUGAR SIN TIENDA — Wikimedia Commons, revisar atribución"
    },
    "choices": [
      {
        "label": "Mirar el edificio",
        "target": "APARTAMENTOS"
      },
      {
        "label": "Mirar la calle",
        "target": "CALLE"
      },
      {
        "label": "Buscar lo que había antes",
        "target": "ANTES"
      }
    ]
  },
  "SEGUIR_VOZ": {
    "tag": "narrativa",
    "html": "<h2>Sigues la voz.</h2>\n<p><em>[VIDEO: vendedor / recorrido]</em></p>\n<p>La voz te lleva hacia otra parte de la calle.</p>",
    "choices": [
      {
        "label": "Entrar a la tienda",
        "target": "TIENDA"
      },
      {
        "label": "Seguir caminando",
        "target": "CALLE"
      }
    ]
  },
  "SEGUIR_MUSICA": {
    "tag": "narrativa",
    "html": "<h2>Sigues la música.</h2>\n<p><em>[VIDEO: recorrido hacia la fuente del sonido]</em></p>",
    "choices": [
      {
        "label": "Llegar a la calle",
        "target": "CALLE"
      },
      {
        "label": "Encontrar una tienda",
        "target": "TIENDA"
      }
    ]
  },
  "ESCUCHAR_MUSICA": {
    "tag": "narrativa",
    "html": "<h2>Escuchas hasta el final.</h2>\n<p><em>[AUDIO COMPLETO]</em></p>\n<p>Ahora escucha lo que queda cuando termina.</p>",
    "choices": [
      {
        "label": "Silencio",
        "target": "SILENCIO"
      }
    ]
  },
  "QUEDARSE_SILENCIO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-silencio\">ESPERA</span>\n<h2>Te quedaste.</h2>\n<p>La pantalla permanece casi vacía.</p>\n<p><strong>8:00 PM</strong></p>",
    "choices": [
      {
        "label": "Entrar en la nueva hora",
        "target": "OCHO_PM"
      }
    ]
  },
  "OCHO_PM": {
    "tag": "narrativa",
    "html": "<span class=\"tag-tiempo\">8:00 PM</span>\n<h2>Algo cambió.</h2>\n<p><em>[VIDEO: calle a las 8 PM]</em></p>\n<p>¿Qué quieres hacer?</p>",
    "choices": [
      {
        "label": "Buscar una tienda abierta",
        "target": "BUSCAR_ABIERTA"
      },
      {
        "label": "Escuchar",
        "target": "SONIDO_8PM"
      },
      {
        "label": "Mirar alrededor",
        "target": "MIRAR_ALREDEDOR"
      }
    ]
  },
  "BUSCAR_ABIERTA": {
    "tag": "narrativa",
    "html": "<h2>Busca una tienda abierta.</h2>\n<p><em>[INTERACCIÓN: elegir puntos de la calle]</em></p>",
    "choices": [
      {
        "label": "Encontrarla",
        "target": "TIENDA"
      },
      {
        "label": "No encontrarla",
        "target": "AUSENCIA"
      }
    ]
  },
  "SONIDO_8PM": {
    "tag": "narrativa",
    "html": "<span class=\"tag-audio\">8:00 PM</span>\n<h2>Escucha otra vez.</h2>\n<p><em>[AUDIO: paisaje sonoro 8 PM]</em></p>",
    "choices": [
      {
        "label": "Voz",
        "target": "UNA_VOZ"
      },
      {
        "label": "Motor",
        "target": "TRAFICO"
      },
      {
        "label": "Silencio",
        "target": "SILENCIO"
      }
    ]
  },
  "DESAPARICION": {
    "tag": "narrativa",
    "html": "<span class=\"tag-resistencia\">AUSENCIA</span>\n<h2>“Ahí quedaba una tienda.”</h2>",
    "media": {
      "type": "audio",
      "src": "assets/audio/entrevista-desaparicion-03.mp3",
      "caption": "AUDIO / ENTREVISTA REAL — LA DESAPARICIÓN DE LAS TIENDAS"
    },
    "choices": [
      {
        "label": "Ver lo que la reemplazó",
        "target": "APARTAMENTOS"
      },
      {
        "label": "Buscar otro recuerdo",
        "target": "MEMORIA"
      }
    ]
  },
  "RESISTENCIA": {
    "tag": "narrativa",
    "html": "<span class=\"tag-resistencia\">RESISTENCIA</span>\n<h2>La ciudad crece. La tienda permanece.</h2>\n<p>¿Por qué?</p>",
    "media": {
      "type": "image",
      "src": "assets/images/resistencia-barrio-tradicional.jpg",
      "alt": "Calle tradicional de un barrio bogotano con negocios locales activos",
      "caption": "FOTO / EL BARRIO QUE RESISTE — Wikimedia Commons, revisar atribución"
    },
    "choices": [
      {
        "label": "Por los vecinos",
        "target": "VECINOS"
      },
      {
        "label": "Por la confianza",
        "target": "FIADO"
      },
      {
        "label": "Porque se adapta",
        "target": "TRANSFORMACION_TIENDA"
      }
    ]
  },
  "FUTURO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-resistencia\">FUTURO</span>\n<h2>¿Qué pasará con la tienda?</h2>",
    "choices": [
      {
        "label": "Que permanezca",
        "target": "RESISTENCIA"
      },
      {
        "label": "Que se transforme",
        "target": "TRANSFORMACION_TIENDA"
      },
      {
        "label": "Que desaparezca",
        "target": "DESAPARICION"
      }
    ]
  },
  "FIADO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">CONFIANZA</span>\n<h2>La libreta.</h2>\n<p><em>[FOTO/AUDIO/TESTIMONIO: fiado]</em></p>\n<p>Una libreta puede guardar años de confianza.</p>",
    "choices": [
      {
        "label": "Seguir la historia",
        "target": "MEMORIA"
      },
      {
        "label": "Volver a la tienda",
        "target": "TIENDA"
      },
      {
        "label": "Preguntar qué cambió",
        "target": "CAMBIOS"
      }
    ]
  },
  "VECINOS": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">VECINOS</span>\n<h2>Hay vecinos en todas partes.</h2>\n<p>Pero, ¿qué convierte a un conjunto de personas en un barrio?</p>",
    "choices": [
      {
        "label": "La cercanía",
        "target": "BARRIO"
      },
      {
        "label": "La confianza",
        "target": "FIADO"
      },
      {
        "label": "Los encuentros",
        "target": "CONVERSACION"
      }
    ]
  },
  "BARRIO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">BARRIO</span>\n<h2>Un barrio no es solamente un conjunto de edificios.</h2>\n<p>También son las relaciones que ocurren entre ellos.</p>",
    "choices": [
      {
        "label": "Escuchar",
        "target": "SONIDO_8PM"
      },
      {
        "label": "Recordar",
        "target": "MEMORIA"
      },
      {
        "label": "Resistir",
        "target": "RESISTENCIA"
      }
    ]
  },
  "CENTRO_COMERCIAL": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">CONSUMO</span>\n<h2>Todo bajo un mismo techo.</h2>\n<p>Aquí también puedes comprar. Pero el espacio funciona diferente.</p>",
    "media": {
      "type": "image",
      "src": "assets/images/centro-comercial-hacienda.jpg",
      "alt": "Fachada de un centro comercial en Bogotá, entrada señalizada",
      "caption": "FOTO / CENTRO COMERCIAL — Wikimedia Commons, revisar atribución"
    },
    "choices": [
      {
        "label": "Comparar",
        "target": "COMPARAR"
      },
      {
        "label": "Salir",
        "target": "CALLE"
      },
      {
        "label": "Buscar una tienda",
        "target": "OTRA_TIENDA"
      }
    ]
  },
  "COMPRAR": {
    "tag": "narrativa",
    "html": "<h2>Compras algo.</h2>\n<p><em>[INTERACCIÓN: elegir producto]</em></p>\n<p>Pero ¿qué recibiste además?</p>",
    "choices": [
      {
        "label": "Una conversación",
        "target": "CONVERSACION"
      },
      {
        "label": "Un recuerdo",
        "target": "MEMORIA"
      },
      {
        "label": "Solo el producto",
        "target": "PRODUCTOS"
      }
    ]
  },
  "TRANSFORMACION_TIENDA": {
    "tag": "narrativa",
    "html": "<span class=\"tag-resistencia\">TRANSFORMACIÓN</span>\n<h2>La tienda cambia.</h2>\n<p>Pedidos por celular. Pagos digitales. Domicilios.</p>\n<p>Pero todavía alguien puede decir:</p>\n<p><strong>“¿Veci?”</strong></p>",
    "media": {
      "type": "image",
      "src": "assets/images/centro-comercial-vending.jpg",
      "alt": "Máquina expendedora automática junto a la entrada de un gimnasio",
      "caption": "FOTO / EL COMERCIO SE AUTOMATIZA"
    },
    "choices": [
      {
        "label": "Volver a la voz",
        "target": "UNA_VOZ"
      },
      {
        "label": "Volver al barrio",
        "target": "BARRIO"
      },
      {
        "label": "Preguntar por el futuro",
        "target": "FUTURO"
      }
    ]
  },
  "COMPARAR": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">COMPARACIÓN</span>\n<h2>Tienda / centro comercial.</h2>\n<p><em>[INTERACCIÓN: tocar cada lado]</em></p>\n<p><strong>TIENDA:</strong> voz, vecino, calle, fiado.</p>\n<p><strong>CENTRO COMERCIAL:</strong> pasillo, marca, consumo.</p>",
    "choices": [
      {
        "label": "Volver a la tienda",
        "target": "TIENDA"
      },
      {
        "label": "Pensar en el barrio",
        "target": "BARRIO"
      }
    ]
  },
  "PAISAJE_COLORES": {
    "tag": "narrativa",
    "html": "<h2>Los colores encontrados.</h2>\n<p>El barrio también se reconoce por cómo se ve.</p>",
    "choices": [
      {
        "label": "Avisos",
        "target": "AVISOS"
      },
      {
        "label": "Calle",
        "target": "CALLE"
      },
      {
        "label": "Tienda",
        "target": "TIENDA"
      }
    ]
  },
  "TRANSFORMACION": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">TRANSFORMACIÓN</span>\n<h2>La ciudad no dejó de crecer.</h2>\n<p>Pero algo dejó de estar.</p>",
    "choices": [
      {
        "label": "Seguir",
        "target": "AUSENCIA"
      },
      {
        "label": "Buscar resistencia",
        "target": "RESISTENCIA"
      }
    ]
  },
  "AUSENCIA": {
    "tag": "narrativa",
    "html": "<span class=\"tag-silencio\">AUSENCIA</span>\n<h2>No encontraste una tienda.</h2>\n<p><em>[VIDEO: calle desolada]</em></p>\n<p>¿La ciudad perdió una tienda? ¿O perdió un lugar para encontrarse?</p>",
    "choices": [
      {
        "label": "Seguir",
        "target": "DIEZ_PM"
      }
    ]
  },
  "DIEZ_PM": {
    "tag": "narrativa",
    "html": "<span class=\"tag-tiempo\">10:00 PM</span>\n<h2>La ciudad sigue ahí.</h2>\n<p><em>[VIDEO: calle desolada a las 10 PM]</em></p>\n<p>¿Qué falta?</p>",
    "choices": [
      {
        "label": "La gente",
        "target": "QUE_QUEDA"
      },
      {
        "label": "La tienda",
        "target": "AUSENCIA"
      },
      {
        "label": "El ruido",
        "target": "SONIDO_8PM"
      }
    ]
  },
  "QUE_QUEDA": {
    "tag": "narrativa",
    "html": "<h2>¿Qué queda?</h2>\n<p>Una voz. Un color. Una libreta. Una memoria. Una calle.</p>",
    "choices": [
      {
        "label": "Pensar en la tienda",
        "target": "RESISTENCIA"
      },
      {
        "label": "Pensar en el barrio",
        "target": "BARRIO"
      },
      {
        "label": "Dejar una pregunta abierta",
        "target": "PREGUNTA"
      }
    ]
  },
  "DESPUES": {
    "tag": "narrativa",
    "html": "<h2>Después del recorrido.</h2>\n<p>La tienda ya no parece solamente un lugar donde comprar.</p>",
    "choices": [
      {
        "label": "Resistencia",
        "target": "RESISTENCIA"
      },
      {
        "label": "Comunidad",
        "target": "BARRIO"
      }
    ]
  },
  "PREGUNTA": {
    "tag": "narrativa",
    "html": "<h2>Una pregunta queda flotando.</h2>\n<p>¿Qué pierde una ciudad cuando pierde los lugares donde las personas se reconocen?</p>",
    "choices": [
      {
        "label": "Pensarlo",
        "target": "REFLEXION_FINAL"
      },
      {
        "label": "Volver a la tienda",
        "target": "TIENDA"
      }
    ]
  },
  "REFLEXION_FINAL": {
    "tag": "narrativa",
    "html": "<span class=\"tag-final\">REFLEXIÓN</span>\n<h2>No es nostalgia.</h2>\n<p>Es observar cómo cambian las relaciones cuando cambia el espacio que las sostiene.</p>",
    "choices": [
      {
        "label": "Resistencia",
        "target": "RESISTENCIA"
      },
      {
        "label": "Futuro",
        "target": "FUTURO"
      },
      {
        "label": "Seguir",
        "target": "FINAL"
      }
    ]
  },
  "FINAL": {
    "tag": "narrativa",
    "html": "<div class=\"final\">\n<h2>¿Dónde estabas?</h2>\n<p>Recuerda el punto desde el que comenzaste.</p>\n<p><em>[AQUÍ SE REVELA LA LOCALIDAD REAL DEL PUNTO]</em></p>\n<p>Quizá ya reconociste el lugar. Quizá no.</p>\n<p>Tal vez la pregunta nunca fue dónde estabas.</p>\n<p class=\"final-phrase\">La pregunta era qué desaparece cuando una ciudad deja de encontrarse en la esquina.</p>\n</div>",
    "choices": [
      {
        "label": "Volver a Bogotá",
        "target": "Start"
      }
    ]
  },
  "PAISAJE_SONORO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-audio\">PAISAJE SONORO</span>\n<h2>Escucha el barrio.</h2>\n<p><em>[AUDIO: voces, vendedores, motores, música]</em></p>",
    "choices": [
      {
        "label": "Seguir una voz",
        "target": "UNA_VOZ"
      },
      {
        "label": "Seguir un motor",
        "target": "TRAFICO"
      },
      {
        "label": "Buscar una tienda",
        "target": "TIENDA"
      }
    ]
  },
  "COMUNIDAD": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">COMUNIDAD</span>\n<h2>La tienda conecta.</h2>\n<p><em>[FOTO/VIDEO: encuentro entre vecinos]</em></p>",
    "choices": [
      {
        "label": "Conversación",
        "target": "CONVERSACION"
      },
      {
        "label": "Memoria",
        "target": "MEMORIA"
      },
      {
        "label": "Resistencia",
        "target": "RESISTENCIA"
      }
    ]
  },
  "IDENTIDAD": {
    "tag": "narrativa",
    "html": "<span class=\"tag-comunidad\">IDENTIDAD BARRIAL</span>\n<h2>Lo que hace reconocible a un lugar.</h2>\n<p>Colores, voces, costumbres, confianza y encuentros.</p>",
    "choices": [
      {
        "label": "Colores",
        "target": "COLORES"
      },
      {
        "label": "Voces",
        "target": "UNA_VOZ"
      },
      {
        "label": "Barrio",
        "target": "BARRIO"
      }
    ]
  },
  "DOMICILIOS": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">DOMICILIOS</span>\n<h2>La tienda llega a la puerta.</h2>\n<p>La forma de comprar cambia.</p>",
    "choices": [
      {
        "label": "Ver la transformación",
        "target": "TRANSFORMACION_TIENDA"
      },
      {
        "label": "Volver a la calle",
        "target": "CALLE"
      }
    ]
  },
  "HOMOGENEIDAD": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">HOMOGENEIDAD</span>\n<h2>Cuando todo empieza a parecerse.</h2>",
    "media": {
      "type": "video",
      "src": "assets/video/homogeneidad-corferias.mp4",
      "caption": "VIDEO / SECTOR CORFERIAS — obra, restaurantes de cadena, ninguna tienda de barrio a la vista"
    },
    "choices": [
      {
        "label": "Buscar color",
        "target": "COLORES"
      },
      {
        "label": "Buscar una tienda",
        "target": "OTRA_TIENDA"
      },
      {
        "label": "Buscar una voz",
        "target": "UNA_VOZ"
      }
    ]
  },
  "AISLAMIENTO": {
    "tag": "narrativa",
    "html": "<span class=\"tag-urbanizacion\">AISLAMIENTO</span>\n<h2>Una puerta entre tú y el barrio.</h2>",
    "media": {
      "type": "image",
      "src": "assets/images/pasillo-comercial-vacio.jpg",
      "alt": "Pasillo comercial moderno y vacío, con una persona limpiando el piso",
      "caption": "FOTO / UN PASILLO SIN NADIE"
    },
    "choices": [
      {
        "label": "Salir a la calle",
        "target": "CALLE"
      },
      {
        "label": "Mirar hacia los edificios",
        "target": "APARTAMENTOS"
      },
      {
        "label": "Buscar un lugar de encuentro",
        "target": "TIENDA"
      }
    ]
  },
  "CIERRE": {
    "tag": "narrativa",
    "html": "<h2>La experiencia no termina aquí.</h2>\n<p>Cada recorrido puede devolverte a la tienda desde un lugar diferente.</p>",
    "choices": [
      {
        "label": "Volver a Bogotá",
        "target": "Start"
      }
    ]
  }
};
