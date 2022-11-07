export function fromStringToDate(dateString: string): Date {
  return new Date(dateString);
}

export function DifferenceHourBetweenDates(date1: Date, date2: Date): number {
  return Math.abs(date1.getTime() - date2.getTime()) / 36e5;
}
