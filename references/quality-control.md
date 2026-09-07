# Control de calidad

## Puertas de aprobación

### Brief

- Objetivo, audiencia y CTA únicos y claros.
- Promesa y claims verificables.
- Marca y avatar seleccionados por separado.
- Consentimiento/licencia de identidad y voz.

### Preproducción

- Guion aprobado o autorización explícita para producirlo.
- Duración estimada compatible con plataforma.
- Cada frase tiene un visual asignado.
- El plan alterna A-roll, B-roll, UI o gráficos con intención.
- Proveedores y posibles costos identificados.

### Producción externa

- `production-approved` antes del primer uso pagado, salvo autorización ya incluida en la solicitud.
- Prompts y referencias versionados.
- Previews revisados antes de variantes costosas.
- Assets con fuente, licencia y hash.

## QA visual por toma

- Identidad, edad aparente adulta, vestuario y accesorios consistentes.
- Manos, dientes, labios, ojos y bordes sin artefactos notorios.
- Mirada y gesto compatibles con el guion.
- B-roll marcado `noTalking` sin movimiento labial aparente.
- Cámara estable o movimiento intencional, sin saltos.
- Sin cambios de escena no solicitados.
- Sin texto generado, marcas de agua o logos falsos.
- Producto y UI representados con fidelidad.

## QA de edición

- Audio maestro continuo y sincronizado.
- Cortes en pausas, beats o cambios de idea.
- Ninguna toma se mantiene más tiempo del necesario.
- Reencuadres digitales conservan nitidez y safe zones.
- Música y efectos no compiten con la voz.
- Loudness consistente entre secciones.
- No hay frames negros, congelamientos involuntarios ni clips offline.

## Textos, subtítulos y CTA

- Ortografía y puntuación revisadas.
- Subtítulos coinciden con el audio, no con un borrador previo.
- Máximo de líneas y velocidad de lectura apropiados para pantalla móvil.
- Contraste suficiente sobre todos los fondos.
- Palabras resaltadas con moderación y sincronía.
- CTA visible el tiempo suficiente y coherente con el objetivo.
- Teléfonos, URLs, precios y fechas verificados contra fuente autorizada.

## QA técnico

- Proporción, resolución, fps, códec y duración correctos.
- Audio presente en todos los canales esperados.
- Inicio atractivo dentro de los primeros segundos.
- Archivo reproducible de principio a fin.
- Nombre de versión y checksum registrados.
- Variantes etiquetadas por la única variable que cambian.

## Reporte mínimo

`qa-report.md` debe incluir:

```text
Campaign:
Render:
Version:
Duration / resolution / fps:
Brand profile:
Avatar profile:
Checks passed:
Known exceptions:
Claims reviewed by:
Rights/licences status:
Recommended next variant:
```

No marcar `delivered` mientras exista una excepción que afecte consentimiento, precisión del claim, reproducción o CTA.

