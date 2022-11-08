export function fromStringToDate(dateString: string): Date {
  return new Date(dateString);
}

export function DifferenceHourBetweenDates(date1: Date, date2: Date): number {
  const diff = Math.abs(date1.getTime() - date2.getTime()) / 36e5;
  // cut decimal to 2 digits
  return Math.round(diff * 100) / 100;
}
