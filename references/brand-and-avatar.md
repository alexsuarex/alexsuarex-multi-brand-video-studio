# Marca y avatar como entidades independientes

## Modelo

Una campaña referencia cuatro identidades separadas:

```text
campaña
├── brandId       qué marca habla
├── avatarId      quién aparece
├── voiceId       qué voz se escucha
└── provider      dónde se genera cada asset
```

No deducir una identidad a partir de otra. El avatar de Alejandro, por ejemplo, puede aparecer en una marca autorizada sin convertir esa marca en su perfil personal. Una página también puede usar un avatar licenciado o no usar avatar.

## Registro inicial de marcas

El registro de ejemplo contempla:

- Alets Fidel Suarez
- MAS Persianas y Enrollables
- Albatros Dev IA
- Handyman PRO
- La Paz Bay Rentals + Real Estate

Son nombres de entrada, no kits de marca completos. Antes de producir, cada perfil debe definir audiencia, voz editorial, identidad visual, CTA y restricciones. No inventar colores, logos, teléfonos, precios ni claims que no estén documentados.

## Perfil de marca

Debe contener al menos:

- nombre y `brandId` estable;
- propósito, oferta y audiencia;
- idioma y tono;
- colores, tipografías y logos disponibles;
- estilo de subtítulos y CTA;
- safe zones o convenciones por canal;
- claims permitidos, claims prohibidos y disclaimers;
- canales y formatos aprobados.

Usar `schemas/brand-profile.schema.json`.

## Modos de avatar

### `owned`

Avatar de una persona del equipo o propietario. Requiere consentimiento verificado y alcance de uso. La referencia del proveedor se guarda en configuración privada o variable de entorno, no en un repositorio público.

### `licensed-library`

Avatar de una biblioteca de proveedor. Guardar proveedor, nombre de catálogo, licencia, territorios/canales y vigencia. “Público” no significa “cualquier persona encontrada en Internet”.

### `new-consented`

Avatar creado a partir de una persona real. Antes de entrenar o cargar material, comprobar consentimiento explícito, finalidad, duración y marcas autorizadas.

### `generated-fictional`

Personaje sintético diseñado para una campaña o familia de campañas. Debe evitar parecido intencional con una persona real no autorizada. Crear una ficha de continuidad: rostro, cabello, edad aparente adulta, vestuario, proporciones, accesorios y rasgos de voz.

### `none`

Video de producto, interfaz, narración, gráficos o B-roll. Puede usar voz en off sin una persona visible.

## Voz y acento

El avatar puede traer voz y acento por defecto, pero la campaña debe registrar el resultado seleccionado. La voz sigue siendo una entidad separada porque:

- un avatar puede usar varias voces permitidas;
- un video puede usar narrador sin avatar;
- una traducción puede conservar rostro y cambiar idioma;
- un B-roll puede continuar con la misma voz maestra.

Registrar idioma, variante regional, ritmo y fuente: `avatar-default`, `cloned-consented`, `licensed`, `synthetic` o `uploaded-audio`.

## Matriz de autorización

Antes de producción externa, resolver:

| Pregunta | Resultado mínimo |
|---|---|
| ¿Quién es la persona o personaje? | Identidad registrada |
| ¿Hay consentimiento o licencia? | `verified` |
| ¿Para qué marcas puede usarse? | Lista o `*` explícito |
| ¿En qué canales y territorio? | Alcance documentado |
| ¿Puede usarse su voz? | Permiso separado |
| ¿Hay fecha de expiración? | Fecha o `null` justificado |

Si cualquier permiso necesario está `unknown` o `denied`, no generar ese avatar. Proponer un modo alternativo.

## Selección creativa

Elegir el modo según el papel que debe cumplir:

- Confianza personal o liderazgo: `owned`.
- Escala rápida y diversidad autorizada: `licensed-library`.
- Embajador recurrente: `new-consented` o `generated-fictional`.
- Producto, tutorial o idea abstracta: `none` puede ser mejor.

La selección no debe basarse únicamente en novedad visual. Debe servir al mensaje, mantener continuidad y ser legalmente reutilizable.

