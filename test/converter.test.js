import { romanToArabic, arabicToRoman } from "../converter.js";

describe("Conversiones generales", () => {
  it("convierte 1 ↔ I", () => {
    expect(arabicToRoman(1)).toBe("I");
    expect(romanToArabic("I")).toBe(1);
  });

  it("convierte 3999 ↔ MMMCMXCIX", () => {
    expect(arabicToRoman(3999)).toBe("MMMCMXCIX");
    expect(romanToArabic("MMMCMXCIX")).toBe(3999);
  });
});
