const { romanToArabic, arabicToRoman } = require("../converter");

describe("Conversión Romanos → Arábigos", () => {
  test("MCMXCIV debe retornar 1994", () => {
    expect(romanToArabic("MCMXCIV")).toBe(1994);
  });

  test("III debe retornar 3", () => {
    expect(romanToArabic("III")).toBe(3);
  });

  test("XLII debe retornar 42", () => {
    expect(romanToArabic("XLII")).toBe(42);
  });

  test("romanToArabic debe permitir minúsculas", () => {
    expect(romanToArabic("mmxxi")).toBe(2021);
  });

  test("Debe lanzar error en romano inválido", () => {
    expect(() => romanToArabic("IC")).toThrow();
  });

  test("Debe lanzar error si recibe vacío", () => {
    expect(() => romanToArabic("")).toThrow();
  });

  test("Debe lanzar error si recibe null", () => {
    expect(() => romanToArabic(null)).toThrow();
  });
});


describe("Conversión Arábigos → Romanos", () => {
  test("1994 debe retornar MCMXCIV", () => {
    expect(arabicToRoman(1994)).toBe("MCMXCIV");
  });

  test("3 debe retornar III", () => {
    expect(arabicToRoman(3)).toBe("III");
  });

  test("42 debe retornar XLII", () => {
    expect(arabicToRoman(42)).toBe("XLII");
  });

  test("El número 1 debe retornar I", () => {
    expect(arabicToRoman(1)).toBe("I");
  });

  test("Debe lanzar error para números fuera de rango (<1)", () => {
    expect(() => arabicToRoman(0)).toThrow();
  });

  test("Debe lanzar error para números fuera de rango (>3999)", () => {
    expect(() => arabicToRoman(4000)).toThrow();
  });

  test("Debe lanzar error si no es número", () => {
    expect(() => arabicToRoman("abc")).toThrow();
  });
});
