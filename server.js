const express = require("express");
const InvalidRomanNumeralError = require("./errors/InvalidRomanNumeralError");
const { romanToArabic, arabicToRoman } = require("./converter");

const app = express();
app.use(express.json());

/* ==========================
   GET /r2a
   ========================== */
app.get("/r2a", (req, res) => {
  try {
    const value = req.query.value;

    if (!value)
      return res.status(400).json({ error: "Falta el parámetro 'value'." });

    const result = romanToArabic(value);
    return res.json({ arabic: result });

  } catch (err) {
    if (err instanceof InvalidRomanNumeralError)
      return res.status(400).json({ error: err.message });

    return res.status(500).json({ error: "Error interno" });
  }
});

/* ==========================
   GET /a2r
   ========================== */
app.get("/a2r", (req, res) => {
  try {
    const value = req.query.value;

    if (value === undefined)
      return res.status(400).json({ error: "Falta el parámetro 'value'." });

    const num = Number(value);

    if (isNaN(num))
      return res.status(400).json({ error: "Debe ser un número." });

    if (num <= 0)
      return res.status(400).json({ error: "Debe ser un número positivo." });

    if (num > 3999)
      return res.status(422).json({ error: "Fuera de rango (1-3999)." });

    const result = arabicToRoman(num);
    return res.json({ roman: result });

  } catch (err) {
    if (err instanceof InvalidRomanNumeralError)
      return res.status(422).json({ error: err.message });

    return res.status(500).json({ error: "Error interno" });
  }
});

/* ==========================
   POST /romanos/a-arabigo
   ========================== */
app.post("/romanos/a-arabigo", (req, res) => {
  try {
    const { roman } = req.body;

    if (!roman)
      return res.status(400).json({ error: "Falta 'roman' en el body." });

    const result = romanToArabic(roman);
    return res.json({ arabic: result });

  } catch (err) {
    if (err instanceof InvalidRomanNumeralError)
      return res.status(400).json({ error: err.message });

    return res.status(500).json({ error: "Error interno" });
  }
});

/* ==========================
   POST /romanos/a-romano
   ========================== */
app.post("/romanos/a-romano", (req, res) => {
  try {
    const { arabic } = req.body;

    if (arabic === undefined)
      return res.status(400).json({ error: "Falta 'arabic' en el body." });

    const num = Number(arabic);

    if (isNaN(num))
      return res.status(400).json({ error: "Debe ser un número." });

    if (num <= 0)
      return res.status(400).json({ error: "Debe ser un número positivo." });

    if (num > 3999)
      return res.status(422).json({ error: "Fuera de rango (1-3999)." });

    const result = arabicToRoman(num);
    return res.json({ roman: result });

  } catch (err) {
    return res.status(500).json({ error: "Error interno" });
  }
});

module.exports = app;
