import { romanToArabic, arabicToRoman } from "../converter.js";
import InvalidRomanNumeralError from "../errors/InvalidRomanNumeralError.js";

describe("Conversión básica", () => {
  test("Romano → Arábigo", () => {
    expect(romanToArabic("X")).toBe(10);
    expect(romanToArabic("IX")).toBe(9);
    expect(romanToArabic("MCMXCIV")).toBe(1994);
  });

  test("Arábigo → Romano", () => {
    expect(arabicToRoman(10)).toBe("X");
    expect(arabicToRoman(9)).toBe("IX");
    expect(arabicToRoman(1994)).toBe("MCMXCIV");
  });

  test("Romano inválido lanza error", () => {
    expect(() => romanToArabic("IIII")).toThrow(InvalidRomanNumeralError);
    expect(() => romanToArabic("ASDF")).toThrow(InvalidRomanNumeralError);
  });

  test("Arábigo fuera de rango lanza error", () => {
    expect(() => arabicToRoman(0)).toThrow(Error);
    expect(() => arabicToRoman(5000)).toThrow(Error);
  });
});
