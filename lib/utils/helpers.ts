export const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
