// converter.js

import InvalidRomanNumeralError from "./errors/InvalidRomanNumeralError.js";

const romanMap = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
};

export function romanToArabic(roman) {
  if (!/^[IVXLCDM]+$/.test(roman)) {
    throw new InvalidRomanNumeralError("Número romano inválido");
  }

  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const current = romanMap[roman[i]];
    if (!current) throw new InvalidRomanNumeralError("Número romano inválido");
    if (current < prev) total -= current;
    else total += current;
    prev = current;
  }

  // Validación adicional: el resultado debe poder ser convertido de nuevo al mismo romano
  if (arabicToRoman(total) !== roman) {
    throw new InvalidRomanNumeralError("Número romano mal formado");
  }

  return total;
}

export function arabicToRoman(num) {
  if (typeof num !== "number" || num <= 0 || num > 3999) {
    throw new Error("Número fuera de rango (1-3999)");
  }

  const val = [
    1000, 900, 500, 400, 100, 90,
    50, 40, 10, 9, 5, 4, 1,
  ];
  const rom = [
    "M","CM","D","CD","C","XC",
    "L","XL","X","IX","V","IV","I",
  ];

  let res = "";
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      num -= val[i];
      res += rom[i];
    }
  }
  return res;
}
