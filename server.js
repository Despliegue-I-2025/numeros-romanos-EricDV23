import express from "express";
import { romanToArabic, arabicToRoman } from "./converter.js";
import InvalidRomanNumeralError from "./errors/InvalidRomanNumeralError.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Servidor funcionando ✔️"));

app.post("/romanos/a-arabigo", (req, res) => {
  try {
    const { roman } = req.body;
    if (!roman) throw new InvalidRomanNumeralError("Se requiere un número romano");
    res.json({ arabic: romanToArabic(roman) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/romanos/a-romano", (req, res) => {
  try {
    const { arabic } = req.body;
    if (typeof arabic !== "number") throw new Error("Número arábigo inválido");
    res.json({ roman: arabicToRoman(arabic) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/r2a", (req, res) => {
  try {
    const { value } = req.query;
    if (!value) throw new InvalidRomanNumeralError("Se requiere valor romano");
    res.json({ arabic: romanToArabic(value) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/a2r", (req, res) => {
  try {
    const value = Number(req.query.value);
    if (isNaN(value) || value <= 0 || value > 3999)
      throw new Error("Número fuera de rango (1-3999)");
    res.json({ roman: arabicToRoman(value) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default app;
