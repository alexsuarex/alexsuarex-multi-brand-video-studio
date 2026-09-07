# Portabilidad entre agentes

## Núcleo universal

La carpeta raíz contiene un `SKILL.md` compatible con el patrón de Agent Skills y mantiene instrucciones, referencias, esquemas y scripts sin depender de un solo proveedor. El agente debe poder leer archivos Markdown y JSON; Node.js solo es necesario para la validación automática.

## Contrato de ejecución

Todo cliente debe poder:

1. Leer `SKILL.md`.
2. Cargar referencias bajo demanda.
3. Crear o editar archivos del proyecto.
4. Descubrir herramientas disponibles.
5. Pedir confirmación cuando falte autorización.
6. Ejecutar el validador o aplicar manualmente los mismos checks.

## Adaptadores

- `adapters/codex.md`: ubicación y uso en Codex.
- `adapters/claude.md`: Claude Code y Claude.ai.
- `adapters/gemini.md`: Gemini CLI.
- `adapters/cursor.md`: plugin o regla de proyecto.
- `adapters/generic-system-prompt.md`: clientes sin soporte nativo.

Los adaptadores no duplican todo el método. Solo enseñan al cliente cómo encontrar y ejecutar el núcleo.

## Resolución de nombres

Las skills complementarias pueden tener nombres distintos. Resolver por descripción o capacidad y registrar el binding en `capabilities.json`.

Ejemplo:

```json
{
  "capability": "video.silentBroll",
  "implementation": "provider-or-skill-name",
  "status": "available"
}
```

Si el cliente no permite descubrimiento, pedir al usuario el nombre de la herramienta disponible o usar fallback.

## Diferencias de interfaz

- Si el cliente admite preguntas estructuradas, agrupar el intake en una sola interacción.
- Si no admite ejecución local, producir los JSON y checklists para que otro agente o editor continúe.
- Si no admite video, no fingir un render: entregar plan, prompts y assets que sí se pudieron crear.
- Si no admite adjuntos persistentes, guardar las rutas y hashes en el manifiesto.

## Versionado

- Versionar la skill con semver.
- Versionar los esquemas con `schemaVersion` independiente.
- Conservar compatibilidad hacia atrás dentro de una misma versión mayor.
- Documentar cambios en `CHANGELOG.md`.
- Etiquetar releases de GitHub cuando la validación pase.

## Distribución

El repositorio puede clonarse en la carpeta de skills del cliente o instalarse mediante el mecanismo oficial del agente. Para clientes que acepten ZIP, empaquetar la carpeta sin `.git`, renders, secretos ni materiales de campaña.

Antes de distribuir públicamente:

1. Elegir licencia.
2. Confirmar que no haya prompts, assets o documentos de terceros sin permiso de redistribución.
3. Revisar ejemplos para datos privados.
4. Ejecutar `npm test`.
5. Crear un release versionado.

