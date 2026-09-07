# Dirección de avatar, cámara y microgestos

## Separar tres capas

1. **Actuación**: expresión, mirada, postura y gesto.
2. **Cámara**: encuadre, movimiento, lente aparente y profundidad.
3. **Edición**: corte, reencuadre, zoom digital, transición y velocidad.

No pedir al modelo de avatar una función que solo existe en la cámara o en la edición. La matriz de `references/provider-routing.md` decide dónde ejecutar cada capa.

## Regla de densidad

Por clip de avatar:

- una intención emocional;
- un gesto corporal principal;
- una expresión breve;
- un movimiento de cámara principal;
- una acción continua, sin cambios de escena generados dentro de la toma.

Demasiadas instrucciones reducen la obediencia y crean movimientos mecánicos.

## Catálogo de cámara

### Básicos

- `locked`: trípode, plano completamente fijo.
- `static-alive`: cámara quieta con respiración, manos y micromovimientos naturales.
- `slow-push-in`: acercamiento casi imperceptible hacia el rostro.
- `fast-opening-push`: acercamiento rápido al comenzar la frase y luego estabilidad.
- `subtle-handheld`: vibración humana leve y controlada.

### Variación

- `pull-back-reveal`: inicia cerrado y revela ambiente.
- `slow-orbit`: arco suave manteniendo al sujeto centrado.
- `tracking-walk`: seguimiento lateral mientras el sujeto camina.
- `shallow-focus-push`: fondo desenfocado y avance lento al sujeto enfocado.

### Énfasis

- `eye-push`: acercamiento extremo a los ojos para una frase clave.
- `low-angle-hero`: contrapicado moderado y avance lento.
- `slow-motion-drift`: entrega ralentizada con deriva suave.

Usar planos avanzados con intención narrativa; no como decoración. `tracking-walk`, `slow-orbit` y cambios fuertes de perspectiva requieren un proveedor cinematográfico o video generativo, no solo un avatar parlante.

## Fallback de cámara local

Cuando el proveedor entrega una toma estable:

- Renderizar con suficiente resolución.
- Crear el movimiento con escala y posición en la composición.
- Mantener ojos dentro de la zona segura.
- Evitar escalar tanto que se perciba pérdida de nitidez.
- Usar easing suave y detener el movimiento antes del siguiente corte.
- Marcar el plan como `implementation: digital-reframe`, no como cámara física.

## Microgestos

Acciones útiles, siempre que sean visibles y coherentes:

- asentir lentamente;
- sonreír de forma breve;
- inclinar la cabeza con curiosidad;
- señalar arriba, izquierda o derecha;
- dar aprobación con el pulgar;
- cruzar o descruzar brazos;
- ajustar gafas, cabello, gorra o ropa;
- tomar y dejar una taza;
- encogerse levemente de hombros;
- mirar un objeto y volver a cámara;
- levantar las cejas al revelar un dato.

Evitar movimientos repetitivos, manos cerca del rostro sin necesidad, gestos que salgan del encuadre y acciones incompatibles con el asset de referencia.

## Sintaxis temporal

### Acción antes de hablar

```text
The presenter [ACTION], looks back at the camera, then says: "[LINE]"
```

### Acción mientras o después de hablar

```text
The presenter says: "[LINE]" [ACTION]
```

El orden textual orienta la secuencia. Mantener la acción en inglés cuando el proveedor la entienda mejor y el diálogo en el idioma final.

## Plantilla de dirección de A-roll

```text
SHOT: [shot size and composition]
PERFORMANCE: [single emotional intention]
ACTION: [one visible micro-gesture]
GAZE: [camera/object direction]
CAMERA: [one supported camera move]
CONTINUITY: same identity, wardrobe, lighting and setting as [reference]
DIALOGUE: "[short spoken line]"
CONSTRAINTS: single continuous take; no scene change; natural hands; no text or watermark
```

Eliminar campos que el proveedor no soporte. Nunca pasar la plantilla completa a ciegas.

## Ritmo de una pieza de 30 segundos

Ejemplo, no fórmula rígida:

- 0–3 s: hook, plano cercano, apertura con gesto o push-in.
- 3–8 s: contexto visual o interfaz.
- 8–14 s: explicación A-roll con cámara estable.
- 14–21 s: B-roll/evidencia con voz en off.
- 21–26 s: frase clave, cambio de escala o gesto.
- 26–30 s: CTA limpio y legible.

Alternar energía, escala y tipo de imagen. Un movimiento de cámara no sustituye una razón para cortar.

## Continuidad

Para tomas relacionadas, bloquear:

- imagen o referencia de identidad;
- vestuario y accesorios;
- peinado y rasgos;
- dirección y temperatura de luz;
- distancia aparente y lado de mirada;
- ambiente y hora del día;
- tono de voz y velocidad.

Cambiar únicamente lo que el plan identifica como variable.

