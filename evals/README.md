# Evals

`evals.json` contiene escenarios para revisar manualmente o con un harness de agente.

## Método

1. Ejecuta cada prompt en una conversación limpia con la skill instalada.
2. Conserva la respuesta y los archivos generados.
3. Marca cada criterio `expected` como cumplido, parcial o fallido.
4. Registra preguntas innecesarias, claims inventados, rutas no autorizadas y archivos ausentes.
5. Compara cambios de la skill contra la versión anterior usando los mismos prompts.

El validador de bundle comprueba que los casos existan y que los artefactos estructurados sean coherentes; no sustituye la evaluación de calidad creativa.

