import { idToString } from './id-to-string';

describe('idToString', () => {
  it('should convert numeric id back to single word', () => {
    expect(idToString(10203)).toEqual(['abc']);
  });

  it('should convert numeric id back to multiple words', () => {
    expect(idToString(102030024025026)).toEqual(['abc', 'xyz']);
  });

  it('should keep pure numbers as numbers', () => {
    expect(idToString(123)).toEqual([123]);
  });

  it('should handle mix of strings and numbers', () => {
    expect(idToString(10203001230024025026)).toEqual(['abc', 123, 'xyz']);
  });

  it('should handle empty input', () => {
    expect(idToString(0)).toEqual([]);
  });

  it('should handle single zeros as empty strings', () => {
    expect(idToString(0)).toEqual([]);
  });

  it('should handle segments with only zeros', () => {
    expect(idToString(100)).toEqual(['a']);
  });

  it('should ignore invalid letter codes', () => {
    expect(idToString(280029)).toEqual(['b']);
  });
});
