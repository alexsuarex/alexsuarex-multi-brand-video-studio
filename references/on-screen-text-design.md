# Diseño de texto en pantalla

`captionStyle` y `ctaStyle` en el perfil de marca son texto libre por diseño, pero **texto
libre no significa "usa un banner genérico centrado por defecto"**. Un banner plano de una
sola línea sobre una caja de color no es un estilo neutral seguro — es una decisión de
diseño débil que un cliente con una referencia visual concreta en mente rechazará.

## Antes de construir cualquier overlay

1. Pregunta explícitamente si hay un video, marca o carrusel de referencia cuyo texto en
   pantalla el cliente quiere imitar. No asumas que "texto grande con buen contraste" es
   suficiente sin preguntar.
2. Si el cliente comparte una referencia (captura, video, competidor), descompón su
   estructura **capa por capa** antes de escribir una sola línea de código: qué aparece
   arriba, qué es decorativo vs. informativo, cómo se agrupan las ideas, alineación,
   jerarquía de tamaños, y en qué orden aparecerían si se animaran. Confírmalo con el
   cliente ("así entiendo tu referencia: ...") antes de generar nada.
3. Trata esa descomposición como una plantilla estructurada, no solo un mood/tono, y
   guárdala en el propio `brand.json` (extendiendo `visual.textSystem` — ver abajo) para
   que las siguientes tomas del mismo proyecto la reutilicen automáticamente.

## Patrón de referencia frecuente ("estilo editorial de capas")

Muchas referencias de clientes en anuncios de redes verticales (Reels/TikTok/Stories)
siguen esta misma jerarquía de 5 capas, de arriba hacia abajo:

| Capa | Qué es | Notas de implementación |
|---|---|---|
| `brandHeader` | Nombre de marca, pequeño, esquina superior | Punto de acento + texto en mayúsculas con tracking amplio |
| `watermark` | Palabra clave del beat, decorativa | Gigante, muy baja opacidad (8-12%), rotada 90° en el margen derecho, NUNCA compite con el texto real |
| `badge` | Etiqueta de contexto | Píldora con borde (no relleno sólido) o texto plano con separador de punto medio |
| `headline` | La idea principal | Mayúsculas, peso muy bold/condensado, 2-4 líneas cortas apiladas, **alineado a la izquierda** (nunca centrado) |
| `supportLine` | Frase de apoyo | Barra oscura + línea de acento a la izquierda, con **una palabra clave resaltada en color de acento dentro de la misma frase** (no bloques de color separados) |

Cuando el cliente no da referencia propia, usa este patrón como default en vez de un
banner centrado — es más robusto y se acerca más a lo que la mayoría de referencias de
este tipo de campaña esperan.

## Errores técnicos ya conocidos al implementar esto con Pillow + ffmpeg

- **Watermark rotado con letras cortadas**: si recortas el lienzo de texto antes de rotar
  90°, usa `img.getbbox()` con margen (`pad`) en los cuatro lados, nunca recortes desde
  `(0,0)` asumiendo que el texto empieza ahí — corta las curvas de letras redondas (O, U, C).
- **`drawtext` de ffmpeg puede no estar disponible** (builds de Homebrew sin
  `libfreetype`/`libfontconfig`). Si falla con "No such filter: drawtext", renderiza el
  texto como PNG con Pillow/Skia/Canvas y compón con el filtro `overlay` — no dependas de
  `drawtext` como única vía.
- Verifica siempre un frame de muestra (`ffmpeg ... -vframes 1 salida.png`) del resultado
  compuesto antes de darlo por bueno; los problemas de posición/opacidad/corte solo se ven
  renderizados, no leyendo el código.

## Registro en `brand.json`

Extiende `visual` con un bloque `textSystem` que describa las capas activas para el
proyecto (nombre, posición, estilo) además de `captionStyle`/`ctaStyle`. Esto hace que el
sistema de texto sea reutilizable por otras tomas y por el siguiente video del mismo
cliente sin tener que re-derivarlo de la conversación.
