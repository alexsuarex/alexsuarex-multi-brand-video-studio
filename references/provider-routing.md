# Enrutamiento por capacidades de proveedor

Última revisión documental: 2026-09-07. Las plataformas cambian; verificar capacidades, costos y términos antes de una producción pagada.

## Regla

Seleccionar proveedor por la capacidad necesaria para cada toma, no por costumbre. Registrar la decisión en `capabilities.json` y el asset en el manifiesto.

## Capas

| Capa | Capacidad requerida | Fallback |
|---|---|---|
| A-roll parlante | Avatar + audio/script + lip-sync | Presentador real o composición faceless |
| Microgesto | Control de expresión/postura/gesto | Gesto más simple o toma estable |
| Cámara cinematográfica | Control espacial real | Reencuadre/zoom digital local |
| B-roll silencioso | Imagen-a-video, `no talking` | Foto estática animada o stock |
| Identidad persistente | Referencia/character lock | Menos tomas o avatar de catálogo |
| UI y textos | Composición editable | NLE o HTML/CSS local |
| Subtítulos | Alineación de palabras | Transcripción y ajuste manual |
| Render | Timeline reproducible | NLE con proyecto editable |

## HeyGen

### Presenter y Custom Motion

Usar para tomas habladas donde importen identidad, voz y lip-sync. Custom Motion puede dirigir postura, mirada, expresiones y gestos, pero la documentación indica que no controla cámara, escenas, props ni acciones como caminar. Mantener el prompt breve: un gesto corporal y una expresión.

Fuente: [Fine-Tune Avatar Gestures and Movements with Custom Motion Prompts](https://help.heygen.com/en/articles/12805098-fine-tune-avatar-gestures-and-movements-with-custom-motion-prompts-avatar-iv-v).

### Single Scene

Usar script o audio cargado para una toma de presentador. El modo cinematográfico es la ruta indicada cuando la toma necesita acciones o dirección de cámara y suele funcionar mejor en clips breves.

Fuente: [Animate Your Avatar from a Photo Using the Single Scene Tool](https://help.heygen.com/en/articles/12623520-animate-your-avatar-from-a-photo-using-the-single-scene-tool).

### Avatar V y audio

La expresividad depende fuertemente del audio, la imagen de entrada y el prompt. Elegir audio con emoción y ritmo adecuados antes de intentar corregir todo mediante instrucciones visuales.

Fuente: [Avatar & Voice FAQ, Troubleshooting, Best Practices, and Credits](https://help.heygen.com/en/articles/15544929-avatar-voice-faq-troubleshooting-best-practices-and-credits).

### Avatar Shots

Puede resolver tomas más dinámicas y control de cámara. La documentación señala limitaciones en el uso de audio separado; si no admite el audio maestro requerido, tratar la salida como visual silencioso y montar la voz localmente.

Fuente: [Avatar Shots Powered by Seedance 2.0](https://help.heygen.com/en/articles/14448006-avatar-shots-powered-by-seedance2).

## Video e imagen generativa

Proveedores como Higgsfield, Runway u otros pueden cubrir B-roll, acciones y cámara. No asumir capacidades por nombre: comprobar en runtime si aceptan referencia de identidad, imagen inicial, duración, relación de aspecto, audio y negative prompt.

Para cada generación registrar:

- modelo y versión;
- prompt final;
- imágenes de referencia;
- seed si existe;
- dimensiones y duración;
- costo estimado/real;
- licencia y restricciones;
- archivo resultante y hash.

## Composición local

Ruta preferida cuando existe en el entorno:

1. HyperFrames y sus skills especializadas.
2. HTML/CSS/GSAP con render reproducible.
3. Remotion u otra timeline programática.
4. NLE tradicional con proyecto editable.
5. FFmpeg para normalización, ensamblado y exportación.

La composición local debe poseer textos, CTA, subtítulos, logos, safe zones, reencuadres y mezcla. No hornear texto dentro de una imagen generada si después necesita edición o localización.

## Árbol de decisión por toma

```text
¿Debe hablar una persona visible?
├── Sí → ¿avatar autorizado y proveedor con lip-sync?
│   ├── Sí → A-roll de avatar
│   └── No → presentador real o narración + visual faceless
└── No → ¿se necesita movimiento físico complejo?
    ├── Sí → video generativo/stock/filmación
    └── No → imagen estática + movimiento local
```

Después preguntar: ¿el movimiento de cámara es real o puede ser reencuadre digital? Elegir la solución más económica que conserve la intención.

## Degradación elegante

- Sin estrategia externa: usar el brief y generar tres ángulos internos.
- Sin imagen generativa: reutilizar assets, stock autorizado o motion graphics.
- Sin avatar: narración faceless.
- Sin lip-sync: voz en off sobre B-roll.
- Sin cámara nativa: reencuadre digital.
- Sin compositor programático: NLE con entregables editables.
- Sin voz clonada: voz licenciada y documentada.

La salida final conserva el mismo esquema aunque cambie la implementación.

