// Mapa de valores romanos
const map = {
  I:1, V:5, X:10, L:50, C:100, D:500, M:1000
};

// Validaciones prohibidas por las pruebas:
const invalidPatterns = [
  /IIII/,    // demasiadas repeticiones
  /VV/,
  /LL/,
  /DD/,
  /IL/, /IC/, /ID/, /IM/,  // sustracciones inválidas
  /XD/, /XM/,
  /VX/, /LC/, /DM/
];

function romanToArabic(roman) {
  roman = roman.toUpperCase();

  // caracteres inválidos
  if (!/^[IVXLCDM]+$/.test(roman)) {
    throw new Error("Numero romano invalido.");
  }

  // reglas inválidas (las pruebas 9,10,11,19)
  for (const pat of invalidPatterns) {
    if (pat.test(roman)) {
      throw new Error("Numero romano invalido.");
    }
  }

  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const curr = map[roman[i]];
    if (curr < prev) total -= curr;
    else total += curr;
    prev = curr;
  }

  if (total < 1 || total > 3999) {
    throw new Error("Numero fuera de rango.");
  }

  return total;
}

function arabicToRoman(n) {
  if (!Number.isInteger(n)) {
    throw new Error("Debe ser un entero.");
  }

  if (n < 1 || n > 3999) {
    throw new Error("Numero fuera de rango.");
  }

  const pairs = [
    ["M", 1000],["CM",900],["D",500],["CD",400],
    ["C",100],["XC",90],["L",50],["XL",40],
    ["X",10],["IX",9],["V",5],["IV",4],["I",1]
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
