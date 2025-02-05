/**
 * Converts strings and numbers to a deterministic numeric ID
 * Letters are converted to their position in alphabet (a=1, b=2, etc)
 * Numbers remain unchanged
 * Single 0 separates letters within a word
 * Double 0 separates words/segments
 */
export function stringToId(segments: (string | number)[]): number {
  if (!segments.length) return 0;

  const result = segments.map((segment) => {
    // If segment is already a number, return it as string
    if (typeof segment === 'number') {
      return segment.toString();
    }

    if (!segment) return '0';

    // Convert string to array of letters
    const letters = segment.split('').map((letter) => {
      // Convert letter to position in alphabet (a=1, b=2, etc)
      const position = letter.toLowerCase().charCodeAt(0) - 96;
      return position > 0 && position < 27 ? position : '';
    }).filter(Boolean); // Remove empty strings

    return letters.length ? letters.join('0') : '0'; // Join letters with single 0
  }).join('00'); // Join segments with double 0

  return Number(result) || 0;
}
