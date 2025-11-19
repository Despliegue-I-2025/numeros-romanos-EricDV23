const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const converterRoutes = require('./routes/converterRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

// Health
app.get('/', (req, res) => res.json({ status: 'ok', service: 'roman-converter' }));

// Swagger UI (documentación)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Rutas versionadas
app.use('/api/v1', converterRoutes);

// Middleware de errores (RFC 7807 style)
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

module.exports = app;
