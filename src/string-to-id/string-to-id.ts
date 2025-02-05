/**
 * Converts strings and numbers to a deterministic numeric ID
 * Letters are converted to their position in alphabet (a=1, b=2, etc)
 * Numbers remain unchanged
 * Single 0 separates letters within a word
 * Double 0 separates words/segments
 */
export function stringToId(segments: (string | number)[]): number {
  if (!segments.length) return 0;

  const result = segments.map((segment, index) => {
    // If segment is already a number, pad with leading zeros
    if (typeof segment === 'number') {
      const isLast = index === segments.length - 1;
      return '00' + segment.toString() + (isLast ? '' : '00');
    }

    if (!segment) return '0';

    // Convert string to array of letters
    const letters = segment.split('').map((letter) => {
      // Convert letter to position in alphabet (a=1, b=2, etc)
      const position = letter.toLowerCase().charCodeAt(0) - 96;
      return position > 0 && position < 27 ? position : '';
    }).filter(Boolean); // Remove empty strings

    const letterResult = letters.length ? letters.join('0') : '0'; // Join letters with single 0
    
    // Add '00' before and after each segment (except last)
    const isLast = index === segments.length - 1;
    return '00' + letterResult + (isLast ? '' : '00');
  }).join(''); // Join segments without separator since we handle it above

  return Number(result) || 0;
}
