---
name: multi-brand-video-studio
description: Planifica, dirige, produce, edita y valida videos publicitarios cortos multi-marca y multi-avatar. Úsala cuando el usuario quiera crear o escalar campañas con avatar propio, avatar licenciado, avatar nuevo o sin avatar; combinar A-roll, B-roll silencioso, interfaces, motion graphics, textos, subtítulos y CTA; o convertir un brief en guion, plan de tomas, prompts y video final. Use for multi-brand short-form video campaigns, avatar direction, camera movement, micro-gestures, silent B-roll, local overlays, and portable production workflows.
---

# Multi-brand Video Studio

Construye campañas reproducibles sin acoplar una marca a una persona. La marca, el avatar, la voz y el proveedor son entidades independientes.

## Principios no negociables

1. Separar siempre `brandId`, `avatarId`, `voiceId` y `provider`.
2. Usar un audio maestro y una línea de tiempo única para sincronizar avatar, B-roll, textos, subtítulos y CTA.
3. Generar con IA solo lo que necesita realismo visual. Construir interfaces, textos, subtítulos, gráficos y CTA localmente siempre que sea posible.
4. Para B-roll con voz en off, pedir explícitamente `no talking`; conservar la boca cerrada o neutral y superponer el audio maestro en edición.
5. No tratar una foto pública como permiso para clonar una identidad. “Avatar público” significa avatar de catálogo con licencia o material cuyo uso esté autorizado.
6. No inventar claims, testimonios, métricas, licencias, precios ni resultados.
7. Antes de consumir créditos o publicar, pedir aprobación solo si el usuario no la dio ya de forma explícita.

## Inicio adaptativo

Antes de preguntar, inspecciona el contexto disponible: archivos del proyecto, brief, marca, assets, videos previos y perfiles existentes. No vuelvas a solicitar datos ya proporcionados.

Carga, si existen:

- `project.json` o el brief equivalente.
- Perfil de marca conforme a `schemas/brand-profile.schema.json`.
- Perfil de avatar conforme a `schemas/avatar-profile.schema.json`.
- Registro de capacidades conforme a `schemas/capabilities.schema.json`.
- Material fuente y entregables previos.

Si faltan datos esenciales, haz una sola ronda compacta con únicamente lo necesario: marca/página, oferta y objetivo, audiencia, plataforma/duración, modo de avatar, materiales disponibles y CTA. Usa los valores por defecto de `references/intake-and-state.md` para lo opcional.

## Enrutamiento de capacidades

Descubre capacidades por descripción, no solo por nombre. Si están disponibles, intégralas en este orden:

1. Estrategia publicitaria o guiones UGC, por ejemplo **El Estratega**.
2. Dirección de prompts estructurados, por ejemplo **Prompts Método 6C**.
3. Creación de kits de imágenes, por ejemplo **Imágenes estáticas**.
4. Avatar, imagen o video generativo.
5. Composición local, subtítulos, audio y render.

Estas capacidades son complementos opcionales. Si alguna no está instalada, usa el contrato de sustitución de `references/creative-modules.md`; no detengas el trabajo ni finjas haber ejecutado una skill ausente.

## Flujo de producción

### 1. Normalizar el brief

Crear o actualizar `project.json` con objetivo, audiencia, oferta, plataforma, duración, idioma, CTA, marca, avatar, restricciones y estado de aprobación. Validarlo contra `schemas/project-brief.schema.json`.

### 2. Seleccionar marca y avatar de forma independiente

Elegir una marca del registro o crear un perfil nuevo. Después elegir uno de estos modos de avatar:

- `owned`: avatar del propietario o del equipo con consentimiento verificado.
- `licensed-library`: avatar de catálogo autorizado.
- `new-consented`: nuevo avatar de una persona con consentimiento explícito.
- `generated-fictional`: personaje sintético sin identidad real no autorizada.
- `none`: video faceless, producto, interfaz o motion graphics.

Aplicar `references/brand-and-avatar.md`. Si el modo implica una persona real sin autorización verificable, detener únicamente esa ruta y proponer un avatar licenciado, ficticio o `none`.

### 3. Diseñar la idea y el guion

Entregar primero:

- ángulo de campaña y promesa verificable;
- 3 hooks breves;
- estructura problema → tensión → mecanismo → prueba → CTA;
- guion hablado natural;
- textos en pantalla separados del diálogo;
- riesgos de claims o derechos.

El guion debe sonar conversacional. No leer literalmente todo el texto visual. Mantener cada segmento de avatar lo bastante corto para controlar actuación y continuidad.

### 4. Convertir el guion en tomas

Crear `shot-plan.json` conforme a `schemas/shot-plan.schema.json`. Cada toma debe tener función, tiempo, fuente, encuadre, cámara, acción, microgesto, audio, texto y transición.

Combinar deliberadamente:

- A-roll del avatar para confianza, explicación o CTA.
- B-roll silencioso para contexto, evidencia visual y ritmo.
- Capturas o recreaciones de interfaz para demostrar el producto.
- Imágenes estáticas animadas cuando un clip generativo no agrega valor.
- Motion graphics y tipografía para ideas abstractas.

Usar tomas de 2–6 s como base; extender solo cuando el diálogo o la acción lo justifiquen. Evitar repetir el mismo encuadre tres veces seguidas.

### 5. Dirigir cámara y microgestos

Aplicar `references/avatar-camera-and-gestures.md`:

- Un movimiento de cámara principal por toma.
- Como máximo un gesto corporal y una expresión breve por clip de avatar.
- El gesto debe ser visible en el encuadre y tener relación con la frase.
- Las acciones “antes de hablar” preceden al diálogo; las acciones “mientras/después” van después de la línea hablada en el prompt.
- Si el proveedor no controla cámara real, producir una toma estable y crear el movimiento mediante reencuadre digital local.

No mezclar instrucciones de cámara, actuación y edición que el proveedor no pueda ejecutar. Consultar `references/provider-routing.md`.

### 6. Producir el audio maestro

Resolver una sola narración maestra antes del montaje final. La voz puede heredarse del avatar o seleccionarse aparte, pero debe quedar registrada en `avatar.json` o `project.json`.

Normalizar, limpiar y medir el audio. Generar alineación de palabras o subtítulos con timecodes. No crear varias locuciones independientes para una misma frase salvo que el plan requiera voces distintas.

### 7. Generar A-roll, B-roll y recursos

Para A-roll, conservar identidad, vestuario, luz, encuadre y dirección de mirada entre tomas relacionadas. Para B-roll usar `references/silent-broll.md` y marcar `noTalking: true`.

Generar primero previews o muestras baratas cuando exista incertidumbre alta. Reutilizar assets aprobados y registrar procedencia, licencia, prompt, proveedor y costo en el manifiesto.

### 8. Componer localmente

Construir textos, subtítulos, CTA, interfaces y motion graphics como capas editables. Si HyperFrames está disponible, usar su flujo y doctrinas; si no, usar HTML/CSS/GSAP, Remotion, un NLE o FFmpeg equivalente sin cambiar el contrato del proyecto.

Respetar safe zones por plataforma, jerarquía visual, contraste, ritmo de lectura y sincronía. El CTA final debe ser visible, legible y consistente con la acción solicitada.

### 9. Validar y entregar

Ejecutar el validador local cuando sea compatible:

```bash
node scripts/validate-project.mjs path/to/project.json path/to/shot-plan.json
```

Aplicar la lista de `references/quality-control.md`. Exportar:

- video maestro;
- variante(s) por formato, si se solicitaron;
- archivos de proyecto editables;
- `project.json`, perfiles utilizados y `shot-plan.json`;
- manifiesto de assets y licencias;
- `qa-report.md` con verificaciones y excepciones.

## Reglas de continuidad

- Si ya existe un render, editar desde el estado actual; no reiniciar la producción.
- Preservar assets, decisiones y cambios del usuario.
- Nombrar versiones de forma incremental: `v1`, `v2`, `v3`.
- Cambiar una variable por variante cuando se pruebe creatividad: hook, avatar, primer plano, CTA o duración; no todas a la vez.
- Si una generación falla, diagnosticar si el problema es identidad, actuación, cámara, audio o montaje y regenerar únicamente la pieza afectada.

## Referencias por necesidad

- Intake y persistencia: `references/intake-and-state.md`
- Marca y avatar: `references/brand-and-avatar.md`
- Integración de módulos creativos: `references/creative-modules.md`
- Cámara y actuación: `references/avatar-camera-and-gestures.md`
- B-roll y prompts: `references/silent-broll.md`
- Proveedores y fallbacks: `references/provider-routing.md`
- Control de calidad: `references/quality-control.md`
- Portabilidad entre agentes: `references/portability.md`

