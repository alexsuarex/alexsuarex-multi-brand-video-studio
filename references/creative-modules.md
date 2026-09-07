# Módulos creativos opcionales

## Objetivo

Permitir que otras skills mejoren el proceso sin convertirlas en dependencias obligatorias. Descubrirlas por capacidades declaradas y adaptar su salida al contrato de esta skill.

## Orden de composición

```text
brief de marca
  → estrategia/ángulos
  → guion y arquitectura de tomas
  → prompts estructurados
  → kit de imágenes o clips
  → avatar/audio
  → composición local
  → QA
```

## Contrato: estrategia publicitaria

Ejemplo de módulo: **El Estratega**.

Entrada:

- marca, oferta, audiencia y objetivo;
- etapa de conciencia;
- prueba disponible;
- plataforma, duración y restricciones de claims.

Salida esperada:

- 3 ángulos diferenciados;
- hook para cada ángulo;
- tensión/problema;
- mecanismo o explicación;
- prueba requerida;
- CTA;
- riesgos y supuestos.

Mapear el ángulo elegido a `project.json`. Si el módulo no existe, crear internamente los tres ángulos con el mismo formato.

## Contrato: compilador de prompts

Ejemplo de módulo: **Prompts Método 6C**.

Entrada:

- ficha de identidad o producto;
- acción;
- escenario y tiempo;
- encuadre y composición;
- cámara, luz y estética;
- restricciones y continuidad.

Salida esperada:

- prompt de imagen inicial;
- prompt de video o animación;
- prompt negativo/restricciones;
- referencias necesarias;
- parámetros del proveedor;
- ID de toma y versión.

Si el módulo no está instalado, usar esos seis bloques como fallback neutral. No atribuirle reglas específicas que no estén disponibles en el entorno.

## Contrato: kit de imágenes estáticas

Ejemplo de módulo: **Imágenes estáticas**.

Entrada:

- producto/servicio y propuesta;
- perfil de marca;
- avatar o sujeto opcional;
- lista de tomas;
- formatos y safe zones.

Salida esperada:

- una imagen maestra coherente;
- variaciones por toma;
- fondos, packshots o elementos aislados;
- prompts y semillas/referencias si el proveedor las expone;
- manifiesto de fuente/licencia.

Usar estas imágenes como keyframes, B-roll animado, fondos o overlays. Si el módulo no existe, producir solo las imágenes necesarias mediante el proveedor disponible.

## Descubrimiento por capacidad

Usar `capabilities.json` y buscar funciones como:

- `strategy.adAngles`
- `prompts.structuredImageVideo`
- `images.brandKit`
- `avatar.talkingPresenter`
- `video.silentBroll`
- `composition.localTimeline`
- `captions.wordTiming`

No fallar porque el nombre de la skill cambió. Si dos módulos cubren lo mismo, preferir el que:

1. ya esté aprobado por el usuario;
2. use assets existentes;
3. reduzca costo o pérdida de calidad;
4. entregue datos estructurados;
5. permita reproducibilidad.

## Reglas de interoperabilidad

- Un módulo nunca publica ni consume créditos si la campaña no está autorizada.
- Toda salida se normaliza a los esquemas de este repositorio.
- Los prompts son artefactos versionados, no la fuente de verdad del proyecto.
- El audio maestro y los timecodes dominan el montaje final.
- Un fallo opcional activa fallback; no invalida toda la campaña.
- Registrar qué módulo produjo cada asset en `asset-manifest.json`.

