
function toRoman(num) {
  if (num < 1 || num > 3999) return "Número fuera de rango (1-3999)";
  const valores = [
    { valor: 1000, simbolo: "M" },
    { valor: 900, simbolo: "CM" },
    { valor: 500, simbolo: "D" },
    { valor: 400, simbolo: "CD" },
    { valor: 100, simbolo: "C" },
    { valor: 90, simbolo: "XC" },
    { valor: 50, simbolo: "L" },
    { valor: 40, simbolo: "XL" },
    { valor: 10, simbolo: "X" },
    { valor: 9, simbolo: "IX" },
    { valor: 5, simbolo: "V" },
    { valor: 4, simbolo: "IV" },
    { valor: 1, simbolo: "I" },
  ];

  let resultado = "";
  for (const { valor, simbolo } of valores) {
    while (num >= valor) {
      resultado += simbolo;
      num -= valor;
    }
  }
  return resultado;
}

function fromRoman(roman) {
  roman = roman.toUpperCase();

  const mapa = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };

  
  if (!/^[MDCLXVI]+$/.test(roman)) {
    return "Número romano inválido";
  }

  
  if (/IIII|XXXX|CCCC|MMMM/.test(roman)) return "Número romano inválido";
  if (/VV|LL|DD/.test(roman)) return "Número romano inválido";

  
  const restasValidas = {
    I: ["V", "X"],
    X: ["L", "C"],
    C: ["D", "M"],
  };

  for (let i = 0; i < roman.length - 1; i++) {
    const actual = roman[i];
    const siguiente = roman[i + 1];

    const valActual = mapa[actual];
    const valSiguiente = mapa[siguiente];

    // Caso de resta
    if (valActual < valSiguiente) {
      if (!restasValidas[actual] || !restasValidas[actual].includes(siguiente)) {
        return "Número romano inválido";
      }
    }
  }

  
  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const valor = mapa[roman[i]];
    if (valor < prev) total -= valor;
    else total += valor;
    prev = valor;
  }

  return total;
}



module.exports = { toRoman, fromRoman };
