export function getLastDayOfMonth(date) {
    let nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);
    return nextMonth.getDate();
}
export function getFirstDayOfWeek(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    return dayOfWeek === 0 ? 1 : dayOfWeek + 1;
}
//# sourceMappingURL=Utilities.js.map