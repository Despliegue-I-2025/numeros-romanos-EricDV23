const InvalidRomanNumeralError = require("./errors/InvalidRomanNumeralError");

const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
const invalidPatterns = [
  /IIII/, /VV/, /LL/, /DD/,
  /IL/, /IC/, /ID/, /IM/,
  /XD/, /XM/,
  /VX/, /LC/, /DM/
];

function romanToArabic(roman) {
  if (!roman || typeof roman !== "string" || roman.trim() === "") {
    throw new InvalidRomanNumeralError(roman, "Romano vacío o inválido");
  }

  roman = roman.toUpperCase();

  if (!/^[IVXLCDM]+$/.test(roman)) {
    throw new InvalidRomanNumeralError(roman, "Número romano inválido");
  }

  for (const pat of invalidPatterns) {
    if (pat.test(roman)) {
      throw new InvalidRomanNumeralError(roman, "Número romano inválido");
    }
  }

  let total = 0, prev = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    const curr = map[roman[i]];
    if (curr < prev) total -= curr;
    else total += curr;
    prev = curr;
  }

  if (total < 1 || total > 3999) {
    throw new InvalidRomanNumeralError(roman, "Número fuera de rango");
  }

  // Validación canónica
  const reconv = arabicToRoman(total);
  if (reconv !== roman) {
    throw new InvalidRomanNumeralError(roman, "Número romano inválido");
  }

  return total;
}

function arabicToRoman(n) {
  if (!Number.isInteger(n)) throw new Error("Debe ser un entero.");
  if (n < 1 || n > 3999) throw new Error("Número fuera de rango");

  const pairs = [
    ["M",1000], ["CM",900], ["D",500], ["CD",400],
    ["C",100], ["XC",90], ["L",50], ["XL",40],
    ["X",10], ["IX",9], ["V",5], ["IV",4], ["I",1]
  ];

  let result = "";
  for (const [sym,val] of pairs) {
    while (n >= val) {
      result += sym;
      n -= val;
    }
  }
  return result;
}

module.exports = { romanToArabic, arabicToRoman };
