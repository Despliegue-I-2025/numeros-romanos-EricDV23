const { romanToArabic, arabicToRoman } = require("../converter");
const InvalidRomanNumeralError = require("../errors/InvalidRomanNumeralError");

describe("UNIT: romanToArabic()", () => {
  test("Convierte romano válido", () => {
    expect(romanToArabic("MCMXCIV")).toBe(1994);
    expect(romanToArabic("MMXXIII")).toBe(2023);
    expect(romanToArabic("XLII")).toBe(42);
    expect(romanToArabic("MMMCMXCIX")).toBe(3999);
  });

  test("Lanza error por vacío", () => {
    expect(() => romanToArabic("")).toThrow(InvalidRomanNumeralError);
  });

  test("Lanza error por caracteres inválidos", () => {
    expect(() => romanToArabic("ASDF")).toThrow(InvalidRomanNumeralError);
  });

  test("Lanza error por orden incorrecto", () => {
    expect(() => romanToArabic("VX")).toThrow(InvalidRomanNumeralError);
  });

  test("Lanza error por sustracción inválida", () => {
    expect(() => romanToArabic("IL")).toThrow(InvalidRomanNumeralError);
  });
});

describe("UNIT: arabicToRoman()", () => {
  test("Convierte arábigo válido", () => {
    expect(arabicToRoman(1)).toBe("I");
    expect(arabicToRoman(7)).toBe("VII");
    expect(arabicToRoman(944)).toBe("CMXLIV");
    expect(arabicToRoman(2023)).toBe("MMXXIII");
  });

  test("Lanza error por número vacío o NaN", () => {
    expect(() => arabicToRoman("")).toThrow(InvalidRomanNumeralError);
    expect(() => arabicToRoman("12abc")).toThrow(InvalidRomanNumeralError);
  });

  test("Lanza error por negativo", () => {
    expect(() => arabicToRoman(-5)).toThrow(InvalidRomanNumeralError);
  });

  test("Lanza error por fuera de rango (alto)", () => {
    expect(() => arabicToRoman(5000)).toThrow(InvalidRomanNumeralError);
  });

  test("Lanza error por cero", () => {
    expect(() => arabicToRoman(0)).toThrow(InvalidRomanNumeralError);
  });
});
