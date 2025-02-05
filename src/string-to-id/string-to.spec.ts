import { stringToId } from './string-to-id';

describe('stringToId', () => {
  it('should convert single word to numeric id', () => {
    expect(stringToId(['abc'])).toBe(10203);
  });

  it('should convert multiple words to numeric id', () => {
    expect(stringToId(['abc', 'xyz'])).toBe(102030024025026);
  });

  it('should keep numbers unchanged', () => {
    expect(stringToId([123])).toBe(123);
  });

  it('should handle mix of strings and numbers', () => {
    expect(stringToId(['abc', 123, 'xyz'])).toBe(1020300123002402502600);
  });

  it('should handle uppercase letters', () => {
    expect(stringToId(['ABC'])).toBe(10203);
  });

  it('should ignore non-alphabet characters', () => {
    expect(stringToId(['a!b@c#'])).toBe(10203);
  });

  it('should handle empty strings', () => {
    expect(stringToId([''])).toBe(0);
  });

  it('should handle empty array', () => {
    expect(stringToId([])).toBe(0);
  });
});
