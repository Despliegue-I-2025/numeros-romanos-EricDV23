class InvalidRomanNumeralError extends Error {
  constructor(input, message = 'Número romano inválido') {
    super(message);
    this.name = 'InvalidRomanNumeralError';
    this.input = input;
  }
}

module.exports = InvalidRomanNumeralError;
