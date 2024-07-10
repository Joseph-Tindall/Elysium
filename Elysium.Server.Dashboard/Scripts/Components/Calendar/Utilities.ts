export function getLastDayOfMonth(date: Date): number {
    let nextMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);

    return nextMonth.getDate();
}

export function getFirstDayOfWeek(date: Date): number {
    const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek: number = firstDayOfMonth.getDay();

    return dayOfWeek === 0 ? 1 : dayOfWeek + 1;
}