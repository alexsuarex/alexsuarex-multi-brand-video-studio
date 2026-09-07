# Multi-brand Video Studio

Skill portable para convertir un brief en una campaña de videos cortos con marca, avatar y proveedor desacoplados. Puede dirigir un avatar propio, uno licenciado, uno nuevo con consentimiento, un personaje ficticio o un video sin avatar; combina A-roll, B-roll silencioso, interfaces, motion graphics, textos, subtítulos y CTA.

## Qué resuelve

- Una sola metodología para Albatros Dev IA, Alets Fidel Suarez, MAS Persianas y Enrollables, Handyman PRO, La Paz Bay Rentals + Real Estate y futuras marcas.
- Movimiento de cámara y microgestos sin depender de una única toma rígida.
- Locución maestra continua sobre clips de avatar y B-roll donde nadie habla.
- Complementos opcionales para estrategia, prompts estructurados e imágenes estáticas.
- Producción local de UI, tipografía, subtítulos, CTA y render final.
- Archivos JSON verificables para repetir, versionar y escalar campañas.

## Arquitectura

```text
SKILL.md                       instrucciones universales del agente
references/                    método y decisiones especializadas
schemas/                       contratos de datos portables
templates/                     ejemplos y formatos reutilizables
scripts/                       validación e instalación sin dependencias
adapters/                      notas para cada cliente LLM
evals/                         casos de prueba de comportamiento
.cursor-plugin/plugin.json     manifiesto para Cursor
```

## Inicio rápido

1. Instala la carpeta completa como skill en tu agente.
2. Copia `templates/project-brief.example.json`, el perfil de marca y el de avatar a una carpeta de campaña.
3. Completa únicamente los campos que el agente no pueda inferir.
4. Pide: “Crea una campaña de 30 segundos para esta marca usando esta skill”.
5. Valida la planificación antes de generar recursos pagados:

```bash
npm test
node scripts/validate-project.mjs templates/project-brief.example.json templates/shot-plan.example.json
```

No requiere dependencias de npm.

## Instalación desde GitHub

### Codex

```bash
git clone https://github.com/alexsuarex/alexsuarex-multi-brand-video-studio.git ~/.codex/skills/multi-brand-video-studio
```

También puede cargarse como directorio o ZIP mediante la API de Skills de OpenAI; consulta la [referencia oficial](https://developers.openai.com/api/reference/python/resources/skills/methods/create).

### Claude Code y Claude.ai

```bash
git clone https://github.com/alexsuarex/alexsuarex-multi-brand-video-studio.git ~/.claude/skills/multi-brand-video-studio
```

Claude.ai admite la carga de una skill empaquetada como ZIP. Consulta la [documentación oficial de Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview).

### Gemini CLI

```bash
gemini skills install https://github.com/alexsuarex/alexsuarex-multi-brand-video-studio
```

Gemini también descubre skills en `~/.gemini/skills/`, `~/.agents/skills/`, `.gemini/skills/` o `.agents/skills/`. Consulta la [documentación oficial de Gemini CLI](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/using-agent-skills.md).

### Cursor

El repositorio incluye un manifiesto de plugin y un `SKILL.md` raíz. Tras publicarlo, puede instalarse como plugin desde GitHub o copiarse al entorno de proyecto. Consulta la [referencia oficial de plugins](https://prod.cursor.com/docs/reference/plugins) y las [reglas de proyecto](https://prod.cursor.com/docs/rules).

### Otros agentes

Copiar la carpeta a la ubicación de skills del cliente. Si el cliente no implementa skills, usar `adapters/generic-system-prompt.md` como instrucción de sistema y conservar `references/`, `schemas/` y `templates/` junto a ella.

## Módulos creativos opcionales

La skill detecta por capacidad —no por dependencia rígida— herramientas equivalentes a:

- **El Estratega** para ángulos y guiones UGC.
- **Prompts Método 6C** para compilar prompts de imagen y video.
- **Imágenes estáticas** para producir kits visuales.

Los archivos originales de esas skills no se redistribuyen aquí. Si están instaladas, se invocan con el contrato definido en `references/creative-modules.md`; si no, se usa el flujo base incluido.

## Seguridad y derechos

- Nunca guardar claves, tokens ni IDs privados en Git.
- Registrar licencias y procedencia de avatares, música, imágenes y clips.
- No clonar una persona real sin consentimiento explícito.
- No publicar ni consumir créditos sin autorización cuando esa autorización no forme parte de la solicitud.
- Revisar claims, precios y resultados antes del render final.

Consulta `SECURITY.md` y `references/quality-control.md`.

## Desarrollo

```bash
npm test
```

Los cambios deben conservar compatibilidad con Node.js 18+ y no introducir dependencias salvo una razón clara. Consulta `CONTRIBUTING.md`.

## Estado

Versión inicial `0.1.0`. No se incluye licencia hasta que el propietario decida si el repositorio será público, privado o de uso interno.
