const express = require("express");
const InvalidRomanNumeralError = require("./errors/InvalidRomanNumeralError");
const { romanToArabic, arabicToRoman } = require("./converter");

const app = express();
app.use(express.json());

// POST /romanos/a-arabigo
app.post("/romanos/a-arabigo", (req, res) => {
  try {
    const { roman } = req.body;
    const arabic = romanToArabic(roman);
    return res.status(200).json({ arabic });
  } catch (err) {
    if (err instanceof InvalidRomanNumeralError) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(400).json({ error: err.message || "Solicitud inválida" });
  }
});

// POST /romanos/a-romano
app.post("/romanos/a-romano", (req, res) => {
  try {
    const { arabic } = req.body;
    const roman = arabicToRoman(arabic);
    return res.status(200).json({ roman });
  } catch (err) {
    if (err.message.includes("fuera de rango")) {
      return res.status(422).json({ error: err.message });
    }
    return res.status(400).json({ error: err.message || "Solicitud inválida" });
  }
});

module.exports = app;
