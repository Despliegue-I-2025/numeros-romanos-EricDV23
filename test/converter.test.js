const { toRoman, fromRoman } = require('../index.js');


// Tests individuales simples
test('Convierte número a romano correctamente', () => {
  expect(toRoman(1)).toBe('I');
  expect(toRoman(4)).toBe('IV');
  expect(toRoman(9)).toBe('IX');
  expect(toRoman(58)).toBe('LVIII');
  expect(toRoman(1994)).toBe('MCMXCIV');
});

test('Convierte romano a número correctamente', () => {
  expect(fromRoman('I')).toBe(1);
  expect(fromRoman('IV')).toBe(4);
  expect(fromRoman('IX')).toBe(9);
  expect(fromRoman('LVIII')).toBe(58);
  expect(fromRoman('MCMXCIV')).toBe(1994);
});

// Array de tests con test.each()
// Esto ejecuta el mismo test para varios pares de valores automáticamente
describe('Conversión cruzada usando arrays de tests', () => {
  const casos = [
    [1, 'I'],
    [3, 'III'],
    [44, 'XLIV'],
    [99, 'XCIX'],
    [2025, 'MMXXV'],
  ];

  test.each(casos)(
    'Convierte %i a %s y viceversa correctamente',
    (numero, romano) => {
      expect(toRoman(numero)).toBe(romano);
      expect(fromRoman(romano)).toBe(numero);
    }
  );
});

// Casos de error o límites
describe('Casos límite y errores', () => {
  test('Número fuera de rango', () => {
    expect(toRoman(0)).toMatch(/fuera de rango/i);
    expect(toRoman(4000)).toMatch(/fuera de rango/i);
  });

  test('Romano inválido', () => {
    expect(fromRoman('ABC')).toMatch(/inválido/i);
  });
});
