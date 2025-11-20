// errors/InvalidRomanNumeralError.js
export default class InvalidRomanNumeralError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidRomanNumeralError";
  }
}
