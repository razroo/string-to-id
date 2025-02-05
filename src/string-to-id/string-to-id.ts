/**
 * Converts strings and numbers to a deterministic numeric ID
 * Letters are converted to their position in alphabet (a=1, b=2, etc)
 * Numbers remain unchanged
 * Single 0 separates letters within a word
 * Double 0 separates words/segments
 * Leading 00 indicates raw numbers
 * Leading 000 indicates text/mixed content
 */
export function stringToId(segments: (string | number)[]): number {
  if (!segments.length) return 0;

  // Determine if we need to treat all numbers as text
  const hasText = segments.some(segment => typeof segment === 'string' && segment.length > 0);
  const prefix = hasText ? '000' : '00';

  const result = segments.map((segment, index) => {
    // If segment is already a number and we're not in text mode
    if (typeof segment === 'number' && !hasText) {
      const isLast = index === segments.length - 1;
      return segment.toString() + (isLast ? '' : '00');
    }

    if (!segment) return '0';

    // Convert segment to string for processing
    const segmentStr = segment.toString();
    
    // Convert string to array of letters/numbers
    const letters = segmentStr.split('').map((char) => {
      if (hasText || isNaN(Number(char))) {
        // Convert letter to position in alphabet (a=1, b=2, etc)
        const position = char.toLowerCase().charCodeAt(0) - 96;
        return position > 0 && position < 27 ? position : '';
      }
      return char;
    }).filter(Boolean); // Remove empty strings

    const letterResult = letters.length ? letters.join('0') : '0'; // Join letters with single 0
    
    // Add '00' after each segment (except last)
    const isLast = index === segments.length - 1;
    return letterResult + (isLast ? '' : '00');
  }).join(''); // Join segments without separator since we handle it above

  return Number(prefix + result) || 0;
}
