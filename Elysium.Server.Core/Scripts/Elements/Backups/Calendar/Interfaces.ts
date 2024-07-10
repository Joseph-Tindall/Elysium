export const MONTH_NAMES: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface DayInfo {
    element: HTMLElement;
    date: Date;
}

export interface DateRange {
    day: number;
    month: number;
    year: number;
}

export interface CalendarState {
    calendar: HTMLElement;
    currentMonth: number;
    currentYear: number;
    startDateRange: DateRange | null;
    endDateRange: DateRange | null;
    dayCache: DayInfo[];
}