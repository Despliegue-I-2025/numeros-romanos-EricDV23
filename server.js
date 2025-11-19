const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { romanToArabic, arabicToRoman } = require('./converter');

// -----------------------
// ENDPOINTS OFICIALES
// -----------------------

// Romano → Arábigo  (la prueba usa /r2a)
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;

  // parámetro faltante
  if (!roman || roman.trim() === "") {
    return res.status(400).json({ error: 'Parametro roman requerido.' });
  }

  try {
    const result = romanToArabic(roman);
    return res.json({ arabic: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Arábigo → Romano (la prueba usa /a2r)
app.get('/a2r', (req, res) => {
  const arabicRaw = req.query.arabic;

  // parámetro faltante
  if (!arabicRaw || arabicRaw.trim() === "") {
    return res.status(400).json({ error: 'Parametro arabic requerido.' });
  }

  const arabic = Number(arabicRaw);

  if (Number.isNaN(arabic)) {
    return res.status(400).json({ error: 'Parametro arabic debe ser numerico.' });
  }

  try {
    const roman = arabicToRoman(arabic);
    return res.json({ roman });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

if (require.main === module) {
  console.log("Servidor corriendo en puerto", PORT);
  app.listen(PORT);
}

module.exports = app;
