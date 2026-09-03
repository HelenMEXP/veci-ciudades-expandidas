# Prueba de video 360° — ¿VECI?

El nodo `TRES_PM` contiene una prueba real con el video:

`assets/video/wunder360-eac-demo-h264.mp4`

El archivo de ejemplo está en proyección **EAC (Equi-Angular Cubemap)**, habitual en videos 360 procesados por YouTube. El proyecto usa Photo Sphere Viewer con `CubemapVideoAdapter`.

## Ejecutar

1. Abrir la carpeta con Visual Studio Code.
2. Ejecutar `index.html` con Live Server.
3. Escoger Engativá, Kennedy o Bosa.
4. Entrar hasta el nodo `3:00 PM`.
5. Pulsar Play en el visor 360° y arrastrar con mouse/dedo para mirar alrededor.

No abrir `story.html` únicamente con `file://`; los módulos ES y las dependencias CDN funcionan de forma más fiable desde Live Server.

## Para nuevos videos

En `js/story-data.js`:

```js
media: {
  type: "video360",
  projection: "eac", // videos descargados/procesados con formato EAC
  src: "assets/video/mi-video-360.mp4",
  caption: "VIDEO 360° / ARRASTRA PARA EXPLORAR"
}
```

Para un video equirectangular 2:1 exportado directamente por una cámara 360:

```js
media: {
  type: "video360",
  projection: "equirectangular",
  src: "assets/video/mi-video-equirectangular.mp4"
}
```
