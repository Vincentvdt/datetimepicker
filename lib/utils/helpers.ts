/**
 * Calculates the number of days in a given month of a given year.
 *
 * @param {number} year - The year to calculate the days for.
 * @param {number} month - The month to calculate the days for. (0-based)
 * @returns {number} - The number of days in the given month.
 */
export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();
