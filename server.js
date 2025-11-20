const express = require('express');
const cors = require('cors');
const { toRoman, fromRoman } = require('./index');
const app = express();

app.use(cors());
app.use(express.json());

// 🟩 a2r — número arábigo → romano
app.get('/a2r', (req, res) => {
  const arabicStr = req.query.arabic;

  if (!arabicStr) {
    return res.status(400).json({ error: 'Parámetro "arabic" requerido.' });
  }

  if (!/^\d+$/.test(arabicStr)) {
    return res.status(400).json({ error: "Parámetro 'arabic' debe ser un número válido." });
  }

  const arabic = parseInt(arabicStr, 10);
  const result = toRoman(arabic);

  if (typeof result !== "string" || result.includes("fuera de rango")) {
    return res.status(400).json({ error: result });
  }

  return res.status(200).json({ roman: result });
});


// 🟨 r2a — número romano → arábigo
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;

  if (!roman) {
    return res.status(400).json({ error: 'Parámetro "roman" requerido.' });
  }

  const result = fromRoman(roman);

  if (typeof result !== "number") {
    return res.status(400).json({ error: result });
  }

  return res.status(200).json({ arabic: result });
});


// Ruta básica
app.get("/", (req, res) => {
  res.send("API Convertidor Romano funcionando");
});

module.exports = app;