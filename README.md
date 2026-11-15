# Ego vs Motivación vs Obsesión — Remotion

Vídeo vertical de 19 segundos, 1080×1920 a 30 fps. El render lo realiza GitHub Actions y publica el MP4 como artefacto.

## Incluye
- Tres escenas: Ego, Motivación y Obsesión; gráficas animadas, escritorios, personaje estilizado, iluminación y movimiento.
- Cierre con llamada a la acción y subtítulos dinámicos con palabras destacadas.
- Voz sintética masculina en español (Edge TTS, es-ES-AlvaroNeural, tono grave).
- Música original sintetizada y efectos de transición generados durante el workflow.
- Render automático al hacer push a main y ejecución manual.

## Descargar el vídeo
En GitHub abre Actions, entra en la última ejecución correcta y descarga el artefacto ego-motivacion-obsesion-mp4.

## Render local
Instala Node, Python, FFmpeg; ejecuta npm install, pip install edge-tts numpy, python scripts/generate_audio.py y luego npm run render.

El audio se genera en el workflow para no depender de archivos privados o con licencia.
