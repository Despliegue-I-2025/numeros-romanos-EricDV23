// Middleware global de manejo de errores (formato inspirado en RFC 7807)
module.exports = (err, req, res, next) => {
  // InvalidRomanNumeralError -> 400
  if (err && err.name === 'InvalidRomanNumeralError') {
    return res.status(400).json({
      type: 'https://api.roman-converter.com/errors/invalid-roman',
      title: 'Número romano inválido',
      status: 400,
      detail: err.message,
      instance: req.originalUrl
    });
  }

  // Reglas de negocio (fuera de rango) -> 422
  if (err && typeof err.message === 'string' && err.message.toLowerCase().includes('rango')) {
    return res.status(422).json({
      type: 'https://api.roman-converter.com/errors/out-of-range',
      title: 'Fuera de rango',
      status: 422,
      detail: err.message,
      instance: req.originalUrl
    });
  }

  // Bad request genérico (por ejemplo parámetro faltante o parse error) -> 400
  if (err && typeof err.message === 'string' && (
    err.message.toLowerCase().includes('requiere') ||
    err.message.toLowerCase().includes('parámetro') ||
    err.message.toLowerCase().includes('debe ser')
  )) {
    return res.status(400).json({
      type: 'https://api.roman-converter.com/errors/bad-request',
      title: 'Petición inválida',
      status: 400,
      detail: err.message,
      instance: req.originalUrl
    });
  }

  // Fallback: 500 internal
  console.error('Unhandled error:', err && (err.stack || err.message || err));
  res.status(500).json({
    type: 'https://api.roman-converter.com/errors/internal',
    title: 'Error interno',
    status: 500,
    detail: 'Ocurrió un error inesperado.',
    instance: req.originalUrl
  });
};
