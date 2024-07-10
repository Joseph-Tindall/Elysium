import { CalendarState, DayInfo } from './Interfaces.js';

export function getCalendarStates(calendar: HTMLElement, calendars: Map<HTMLElement, CalendarState>): CalendarState[] {
    const parent: HTMLElement = calendar.parentElement;
    if (parent?.classList.contains('combo-calendar')) {
        return Array.from(parent.querySelectorAll('.module-calendar'))
            .map((module: HTMLElement) => calendars.get(module))
            .filter(Boolean) as CalendarState[];
    }
    return [calendars.get(calendar)].filter(Boolean) as CalendarState[];
}

export function clearRange(dayCache: DayInfo[]): void {
    dayCache.forEach((dayInfo: DayInfo) => {
        console.log("Class list:", dayInfo.element.classList);
        dayInfo.element.classList.remove('active', 'range');
    });
}

export function updateMonthLabel(calendar: HTMLElement, month: number, year: number, MONTH_NAMES: string[]): void {
    const label: HTMLElement = calendar.querySelector('.calendar-month-label');
    if (label) {
        label.textContent = `${MONTH_NAMES[month]} ${year}`;
    }
}

export function updateNavigationButtons(state: CalendarState, today: Date, calendars: Map<HTMLElement, CalendarState>): void {
    const prevButton: HTMLButtonElement = state.calendar.querySelector('.prev-month') as HTMLButtonElement;
    const nextButton: HTMLButtonElement = state.calendar.querySelector('.next-month') as HTMLButtonElement;

    const parent: HTMLElement = state.calendar.parentElement;
    let firstCalendarState: CalendarState | null = null;
    let secondCalendarState: CalendarState | null = null;

    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars: HTMLElement[] = Array.from(parent.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            firstCalendarState = calendars.get(moduleCalendars[0]);
            secondCalendarState = calendars.get(moduleCalendars[1]);
        }
    }

    prevButton.disabled = false;
    nextButton.disabled = false;

    if (firstCalendarState && secondCalendarState) {
        if (state === secondCalendarState) {
            nextButton.disabled = (state.currentYear === today.getFullYear() && state.currentMonth === today.getMonth());
            prevButton.disabled = (state.currentMonth === firstCalendarState.currentMonth + 1 && state.currentYear === firstCalendarState.currentYear)
                || (state.currentMonth === 0 && firstCalendarState.currentMonth === 11 && state.currentYear === firstCalendarState.currentYear + 1);
        } else if (state === firstCalendarState) {
            nextButton.disabled = (state.currentMonth === 11 && secondCalendarState.currentMonth === 0 && state.currentYear === secondCalendarState.currentYear - 1)
                || (state.currentMonth === secondCalendarState.currentMonth - 1 && state.currentYear === secondCalendarState.currentYear);
        }
    }

    prevButton.style.opacity = prevButton.disabled ? '0' : '1';
    nextButton.style.opacity = nextButton.disabled ? '0' : '1';
}
