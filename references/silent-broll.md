# B-roll silencioso con voz maestra

## Definición

B-roll es un clip de apoyo en el que el avatar o sujeto no pronuncia el guion. La narración continúa desde el audio maestro durante la edición.

No generar labios hablando para luego silenciarlos: pedir `no talking`, expresión natural y boca cerrada o neutral desde el origen.

## Usos

- Demostrar un problema o resultado.
- Mostrar ambiente, producto, manos, pantalla o proceso.
- Cambiar ritmo sin cambiar de narrador.
- Ocultar un corte del A-roll.
- Añadir evidencia visual a una afirmación.
- Crear continuidad con el mismo avatar sin otra línea hablada.

## Plantilla de imagen inicial

```text
[same licensed/consented person or defined fictional character], [single natural action],
in [specific setting], [lighting and time], [shot size and angle],
[brand-compatible visual style], photorealistic, natural anatomy and hands,
no speaking, mouth neutral, no text, no watermark
```

Si no se necesita el avatar, sustituir identidad por producto, manos, ambiente o interfaz.

## Plantilla de animación

```text
[one supported camera movement], cinematic but natural, no talking.
Keep the same subject identity, wardrobe and environment as the reference.
The subject [single visible action]. [lighting/atmosphere].
Single continuous take; no cuts or scene changes; no text; no watermark.
```

## Seis bloques de fallback

Cuando no exista un compilador de prompts instalado, estructurar cada prompt con:

1. Sujeto e identidad.
2. Acción única.
3. Escenario y momento.
4. Composición y encuadre.
5. Cámara, luz y estética.
6. Restricciones y continuidad.

## Matriz de selección

| Necesidad | Recurso preferido |
|---|---|
| Producto ya fotografiado | Foto real animada o movimiento local |
| Interfaz verificable | Captura real o recreación local |
| Mismo avatar, sin hablar | Imagen de identidad → clip `no talking` |
| Situación genérica | Stock licenciado o video generativo |
| Concepto abstracto | Motion graphic o tipografía |
| Acción compleja de manos | Video real/licenciado antes que generación incierta |

## Cámara

Elegir una instrucción compatible:

- plano fijo o `static-alive` para credibilidad;
- push-in lento para interés;
- pull-back para revelar contexto;
- seguimiento para acción caminando;
- órbita para producto o sujeto estable;
- handheld sutil para estética UGC;
- profundidad de campo para separar sujeto y fondo.

No añadir simultáneamente órbita, zoom, paneo y cambio de escena.

## Audio en montaje

- Mutear el audio generado del B-roll salvo que contenga ambiente deliberado y autorizado.
- Continuar `voice_master` sin cortes audibles.
- Añadir ambiente o efectos en pistas separadas.
- Hacer ducking de música bajo diálogo.
- Evitar que un gesto visual coincida con una palabra distinta a la intención original.

## Registro en el plan

Cada toma B-roll debe declarar:

- `role: "broll"`;
- `noTalking: true`;
- `audio.mode: "voiceover"`, `"music"` o `"ambient"`;
- fuente o prompt;
- referencia de identidad si aplica;
- licencia;
- movimiento de cámara;
- frase de audio que cubre.

El validador rechaza un B-roll sin `noTalking: true`.

