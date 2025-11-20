// server.js
import express from "express";
import { romanToArabic, arabicToRoman } from "./converter.js";
import InvalidRomanNumeralError from "./errors/InvalidRomanNumeralError.js";

const app = express();
app.use(express.json());

// Ruta raíz para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor funcionando ✔️");
});

// POST: romano → arábigo
app.post("/romanos/a-arabigo", (req, res) => {
  try {
    const { roman } = req.body;
    if (!roman) throw new InvalidRomanNumeralError("Se requiere un número romano");
    const arabic = romanToArabic(roman);
    res.json({ arabic });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST: arábigo → romano
app.post("/romanos/a-romano", (req, res) => {
  try {
    const { arabic } = req.body;
    if (typeof arabic !== "number") throw new Error("Número arábigo inválido");
    const roman = arabicToRoman(arabic);
    res.json({ roman });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: /r2a
app.get("/r2a", (req, res) => {
  try {
    const { value } = req.query;
    if (!value) throw new InvalidRomanNumeralError("Se requiere valor romano");
    const arabic = romanToArabic(value);
    res.json({ arabic });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: /a2r
app.get("/a2r", (req, res) => {
  try {
    const value = Number(req.query.value);
    if (isNaN(value) || value <= 0 || value > 3999) {
      throw new Error("Número fuera de rango (1-3999)");
    }
    const roman = arabicToRoman(value);
    res.json({ roman });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default app;

// Solo escuchar si se ejecuta en local (no tests y no producción serverless)
if (process.env.NODE_ENV !== "test" && process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
