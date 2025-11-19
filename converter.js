const InvalidRomanNumeralError = require("./errors/InvalidRomanNumeralError");

function romanToArabic(roman) {
  if (!roman || typeof roman !== "string")
    throw new InvalidRomanNumeralError("Entrada inválida.");

  roman = roman.toUpperCase();

  // Validar caracteres
  if (!/^[MDCLXVI]+$/.test(roman))
    throw new InvalidRomanNumeralError("Romano inválido.");

  // Validar repeticiones ilegales
  if (/IIII|XXXX|CCCC|MMMM/.test(roman))
    throw new InvalidRomanNumeralError("Romano inválido.");

  // Validar repeticiones de V, L, D (no pueden repetirse)
  if (/VV|LL|DD/.test(roman))
    throw new InvalidRomanNumeralError("Romano inválido.");

  // Validar sustracciones ilegales
  if (/IL|IC|ID|IM|XD|XM|VX|LC|DM/.test(roman))
    throw new InvalidRomanNumeralError("Romano inválido.");

  const map = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };

  let i = 0;
  let result = 0;

  while (i < roman.length) {
    if (i + 1 < roman.length && map[roman.substring(i, i + 2)]) {
      result += map[roman.substring(i, i + 2)];
      i += 2;
    } else {
      result += map[roman[i]];
      i++;
    }
  }

  return result;
}

function arabicToRoman(number) {
  if (typeof number !== "number" || isNaN(number))
    throw new InvalidRomanNumeralError("Número inválido.");

  if (number < 1 || number > 3999)
    throw new InvalidRomanNumeralError("Fuera de rango (1-3999).");

  const map = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];

  let result = "";

  for (const item of map) {
    while (number >= item.value) {
      result += item.numeral;
      number -= item.value;
    }
  }

  return result;
}

module.exports = { romanToArabic, arabicToRoman };
