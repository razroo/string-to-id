import { stringToId } from './string-to-id';

// Number() done to sidestep octal error
// https://eslint.org/docs/latest/rules/no-octal
describe('stringToId', () => {
  it('should convert single word to numeric id with text prefix', () => {
    expect(stringToId(['abc'])).toBe(102030000);
  });

  it('should convert multiple words to numeric id with text prefix', () => {
    expect(stringToId(['abc', 'xyz'])).toBe(102030002402502600000);
  });

  it('should keep numbers unchanged with number prefix', () => {
    expect(stringToId([123])).toBe(12300);
  });

  it('should handle mix of strings and numbers with text prefix', () => {
    expect(stringToId(['abc', 123, 'xyz'])).toBe(102030001230024025026000);
  });

  it('should handle multiple numbers with number prefix', () => {
    expect(stringToId([123, 456])).toBe(12300456);
  });

  it('should handle uppercase letters with text prefix', () => {
    expect(stringToId(['ABC'])).toBe(102030000);
  });

  it('should ignore non-alphabet characters with text prefix', () => {
    expect(stringToId(['a!b@c#'])).toBe(102030000);
  });

  it('should handle empty strings', () => {
    expect(stringToId([''])).toBe(0);
  });

  it('should handle empty array', () => {
    expect(stringToId([])).toBe(0);
  });

  it('should treat single digit as text when mixed with letters', () => {
    expect(stringToId(['a1b'])).toBe(102001002000);
  });

  it('should handle single letter with text prefix', () => {
    expect(stringToId(['a'])).toBe(1000);
  });
});
