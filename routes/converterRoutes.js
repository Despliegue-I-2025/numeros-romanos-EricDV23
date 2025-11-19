const express = require('express');
const router = express.Router();
const InvalidRomanNumeralError = require('../errors/InvalidRomanNumeralError');

// Conversores (puras funciones internas)
function validateRomanString(s) {
  return typeof s === 'string' && s.trim().length > 0;
}

function romanToArabic(roman) {
  if (!validateRomanString(roman)) throw new InvalidRomanNumeralError(roman, 'Debe proporcionar un número romano válido.');

  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  const upper = roman.toUpperCase();
  let total = 0;
  let prev = 0;

  // cálculo con resta cuando aplica
  for (let i = upper.length - 1; i >= 0; i--) {
    const ch = upper[i];
    const curr = map[ch];
    if (!curr) throw new InvalidRomanNumeralError(roman, 'Contiene caracteres no válidos.');
    if (curr < prev) total -= curr; else total += curr;
    prev = curr;
  }

  // chequeo rango
  if (total < 1 || total > 3999) throw new Error('Número fuera del rango permitido (1–3999).');

  // validación final: reconvertir y comparar (evita IIV, VX, etc.)
  const reconv = arabicToRoman(total);
  if (reconv !== upper) throw new InvalidRomanNumeralError(roman, 'Formato romano no estándar o inválido.');

  return total;
}

function arabicToRoman(arabic) {
  if (typeof arabic === 'string' && arabic.trim() !== '') arabic = Number(arabic);
  if (!Number.isInteger(arabic)) throw new Error('El parámetro arabic debe ser un entero.');
  if (arabic < 1 || arabic > 3999) throw new Error('Número fuera del rango permitido (1–3999).');

  const map = [
    { value:1000, symbol:'M' }, { value:900, symbol:'CM' }, { value:500, symbol:'D' },
    { value:400, symbol:'CD' }, { value:100, symbol:'C' }, { value:90, symbol:'XC' },
    { value:50, symbol:'L' }, { value:40, symbol:'XL' }, { value:10, symbol:'X' },
    { value:9, symbol:'IX' }, { value:5, symbol:'V' }, { value:4, symbol:'IV' }, { value:1, symbol:'I' }
  ];

  let n = arabic;
  let result = '';
  for (const { value, symbol } of map) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

// GET /api/v1/r2a?roman=...
router.get('/r2a', (req, res, next) => {
  try {
    const { roman } = req.query;
    if (roman === undefined) {
      // RFC7807-like error via throw to be caught by middleware
      throw new InvalidRomanNumeralError(roman, 'Parámetro `roman` requerido.');
    }
    const output = romanToArabic(roman);
    res.status(200).json({ input: roman.toUpperCase(), output });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/a2r?arabic=...
router.get('/a2r', (req, res, next) => {
  try {
    const { arabic } = req.query;
    if (arabic === undefined) {
      throw new Error('Parámetro `arabic` requerido.');
    }
    const parsed = parseInt(arabic, 10);
    if (Number.isNaN(parsed)) throw new Error('Parámetro `arabic` debe ser un entero.');
    const output = arabicToRoman(parsed);
    res.status(200).json({ input: parsed, output });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
