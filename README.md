# Roman Converter API

API REST que convierte números Romanos ↔ Arábigos.
Incluye manejo de errores robusto (RFC 7807 style), documentación Swagger y CI/CD en Vercel.

## Requisitos
- Node.js 18+
- Cuenta en Vercel
- Permisos admin en repo GitHub para configurar secrets

## Archivos principales
- `server.js` - punto de entrada
- `routes/converterRoutes.js` - lógica de endpoints
- `middlewares/errorHandler.js` - manejo global de errores (RFC 7807)
- `errors/InvalidRomanNumeralError.js` - error personalizado
- `swagger.json` - documentación OpenAPI
- `tests/conversion.test.js` - Jest + Supertest

## Endpoints
- `GET /api/v1/r2a?roman=MCMXCIV` -> `{ input: "MCMXCIV", output: 1994 }`
- `GET /api/v1/a2r?arabic=2025` -> `{ input: 2025, output: "MMXXV" }`
- `GET /api-docs` -> Swagger UI

## Ejecutar localmente
1. Instalar dependencias:
   ```bash
   npm install
