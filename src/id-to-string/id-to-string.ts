/**
 * Converts a numeric ID back to an array of strings/numbers
 * Numbers between single 0s are converted to letters (1=a, 2=b, etc)
 * Double 0s separate words/segments
 * Pure numbers are kept as numbers
 */
export function idToString(id: number): (string | number)[] {
    if (!id) return [];
    
    const idStr = id.toString();
    const segments = idStr.split('00').filter(Boolean); // Split on word boundaries
    
    return segments.map(segment => {
        // If segment is a pure number with no letter separators, return as number
        if (!segment.includes('0')) {
            return Number(segment);
        }

        // Convert groups of numbers back to letters
        const letters = segment.split('0').map(num => {
            const code = Number(num);
            // Convert number back to letter (1=a, 2=b, etc)
            return code > 0 && code < 27 
                ? String.fromCharCode(code + 96)
                : '';
        }).join('');

        return letters || '0';
    });
}