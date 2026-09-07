# Intake adaptativo y estado del proyecto

## Objetivo

Preguntar lo mínimo, conservar decisiones y permitir que otro agente continúe desde el mismo punto.

## Orden de descubrimiento

1. Buscar un `project.json` explícito o un brief adjunto.
2. Revisar la estructura y convenciones del proyecto actual.
3. Buscar perfiles de marca y avatar referenciados.
4. Inventariar logos, capturas, audios, clips, renders y guiones existentes.
5. Extraer datos confirmados antes de preguntar.
6. Preguntar en una sola ronda solo los campos esenciales que sigan faltando.

No inferir desde el nombre de la carpeta información sensible, legal o comercial.

## Campos esenciales

| Campo | Preguntar cuando | Default seguro |
|---|---|---|
| Marca o página | No se puede identificar | Ninguno |
| Oferta/tema | No existe brief o guion | Ninguno |
| Objetivo | Hay varias acciones posibles | Una sola conversión primaria |
| Audiencia | El mensaje cambiaría sustancialmente | Audiencia declarada por la marca |
| Plataforma/formato | No puede inferirse | Vertical 9:16, 1080×1920 |
| Duración | No puede inferirse | 30 s |
| Modo de avatar | No está decidido | `owned` si ya existe y está autorizado; si no, `none` |
| Materiales | No hay inventario | Reutilizar primero; generar después |
| CTA | No está definido | Pedir una acción verificable |

## Campos opcionales

No bloquear por música, transición, color secundario, gesto exacto, proveedor o movimiento de cámara. Proponer un valor razonable y registrarlo como `assumed`.

## Formato de una ronda de preguntas

Pedir como máximo seis respuestas agrupadas, con opciones cuando ayuden. Ejemplo:

1. Marca/página y oferta.
2. Objetivo y público.
3. Plataforma, proporción y duración.
4. Avatar: propio, catálogo licenciado, nuevo con consentimiento, ficticio o ninguno.
5. Materiales que deben reutilizarse.
6. CTA y restricciones.

Si el usuario responde parcialmente, continuar con defaults reversibles y marcar los supuestos.

## Estados

Usar estos estados en `project.json`:

- `draft`: datos incompletos, sin producción externa.
- `brief-approved`: concepto y claims aceptados.
- `production-approved`: autorizado el uso de proveedores y créditos.
- `generating`: recursos en producción.
- `editing`: montaje local.
- `qa`: revisión técnica y editorial.
- `delivered`: entregables exportados.
- `blocked`: únicamente cuando falta un permiso, derecho o dato imprescindible.

## Estructura recomendada de campaña

```text
campaign-slug/
  project.json
  brand.json
  avatar.json
  capabilities.json
  script.md
  shot-plan.json
  asset-manifest.json
  assets/
    source/
    generated/
    processed/
  composition/
  renders/
  qa-report.md
```

Respeta la estructura existente si ya hay una. No muevas ni renombres materiales del usuario sin necesidad.

## Registro de decisiones

Cada decisión relevante debe incluir:

- `value`: decisión actual.
- `source`: `user`, `brand-profile`, `existing-asset`, `provider`, `agent-assumption`.
- `status`: `confirmed`, `assumed`, `needs-review`.
- `updatedAt`: fecha ISO 8601.

El agente puede avanzar con decisiones `assumed` si son reversibles y no consumen créditos ni afectan derechos.

## Reanudación

Al volver a una campaña:

1. Leer `project.json` y el manifiesto.
2. Comparar archivos y renders con el último estado registrado.
3. Continuar desde el primer entregable ausente o fallido.
4. No regenerar assets aprobados por defecto.
5. Incrementar la versión del render sin sobrescribir el anterior.

