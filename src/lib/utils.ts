export function getTodayFormatted(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formats date as 'YYYY-MM-DD'
}