class InvalidRomanNumeralError extends Error {
  constructor(input, message) {
    super(message);
    this.name = "InvalidRomanNumeralError";
    this.input = input;
  }
}

module.exports = InvalidRomanNumeralError;

