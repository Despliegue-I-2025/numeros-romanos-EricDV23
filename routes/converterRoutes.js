const express = require('express');
const router = express.Router();
const InvalidRomanNumeralError = require('../errors/InvalidRomanNumeralError');

function validateRomanString(s) {
  return typeof s === 'string' && s.trim().length > 0;
}

// --- Conversores (los dejé tal cual los tenías) ---
function romanToArabic(roman) {
  if (!validateRomanString(roman)) throw new InvalidRomanNumeralError(roman, 'Parametro roman requerido.');

  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  const upper = roman.toUpperCase();
  let total = 0;
  let prev = 0;

  for (let i = upper.length - 1; i >= 0; i--) {
    const ch = upper[i];
    const curr = map[ch];
    if (!curr) throw new InvalidRomanNumeralError(roman, 'Caracteres romanos inválidos.');
    if (curr < prev) total -= curr; else total += curr;
    prev = curr;
  }

  if (total < 1 || total > 3999) throw new Error('Número fuera del rango permitido (1–3999).');

  const reconv = arabicToRoman(total);
  if (reconv !== upper) throw new InvalidRomanNumeralError(roman, 'Formato romano no estándar o inválido.');

  return total;
}

function arabicToRoman(arabic) {
  if (typeof arabic === 'string' && arabic.trim() !== '') arabic = Number(arabic);
  if (!Number.isInteger(arabic)) throw new Error('Parametro arabic debe ser numerico.');
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

// ------------------------------------------------------
// ✔ NUEVOS ENDPOINTS POST para que los tests funcionen
// ------------------------------------------------------

// Romano → Arábigo (/romanos/a-arabigo)
router.post('/romanos/a-arabigo', (req, res) => {
  const { roman } = req.body || {};

  if (!roman || roman.trim() === "") {
    return res.status(400).json({ error: 'Parametro roman requerido.' });
  }

  try {
    const result = romanToArabic(roman);
    return res.status(200).json({ arabic: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Arábigo → Romano (/romanos/a-romano)
router.post('/romanos/a-romano', (req, res) => {
  const { arabic } = req.body || {};

  if (arabic === "" || arabic === undefined) {
    return res.status(400).json({ error: 'Parametro arabic requerido.' });
  }

  try {
    const result = arabicToRoman(arabic);
    return res.status(200).json({ roman: result });
  } catch (err) {
    // El test requiere 422 cuando está fuera de rango
    if (err.message.includes('rango')) {
      return res.status(422).json({ error: 'Número fuera del rango permitido (1–3999).' });
    }

    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;


