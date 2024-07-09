import { CalendarState, DayInfo, MONTH_NAMES } from './Interfaces.js';
import { getCalendarStates, clearRange, updateMonthLabel, updateNavigationButtons } from './Utilities.js';

export class Calendar {
    private readonly calendar: HTMLElement;
    public readonly state: CalendarState;

    constructor(calendar: HTMLElement) {
        const today: Date = new Date();
        this.state = {
            calendar: calendar,
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            startDateRange: null,
            endDateRange: null,
            dayCache: []
        };

        this.calendar = calendar;
    }

    public populateCalendar(): void {
        const { calendar, currentMonth, currentYear } = this.state;
        const daysContainer: HTMLElement = calendar.querySelector(".days");
        if (!daysContainer) return;

        while (daysContainer.children.length > 7) {
            daysContainer.removeChild(daysContainer.lastChild!);
        }

        const today: Date = new Date();
        const todayDate: number = today.getDate();
        const todayMonth: number = today.getMonth();
        const todayYear: number = today.getFullYear();

        const firstDayOfMonth: Date = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth: Date = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth: number = lastDayOfMonth.getDate();
        const startDay: number = firstDayOfMonth.getDay();

        for (let i: number = 0; i < startDay; i++) {
            const emptyCell: HTMLDivElement = document.createElement("div");
            daysContainer.appendChild(emptyCell);
        }

        this.state.dayCache.length = 0;
        for (let day: number = 1; day <= daysInMonth; day++) {
            const dayCell: HTMLDivElement = document.createElement("div");
            dayCell.className = "day";
            dayCell.textContent = day.toString();
            dayCell.dataset.day = day.toString();
            dayCell.dataset.month = currentMonth.toString();
            dayCell.dataset.year = currentYear.toString();

            dayCell.addEventListener('click', (event) => this.onDayClick(event));

            if (day === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
                dayCell.classList.add("today");
            }

            if (this.state.startDateRange && day === this.state.startDateRange.day && currentMonth === this.state.startDateRange.month && currentYear === this.state.startDateRange.year
                || this.state.endDateRange && day === this.state.endDateRange.day && currentMonth === this.state.endDateRange.month && currentYear === this.state.endDateRange.year) {
                dayCell.classList.add("active");
            }

            this.state.dayCache.push({ element: dayCell, date: new Date(currentYear, currentMonth, day) });
            daysContainer.appendChild(dayCell);
        }

        const states: CalendarState[] = getCalendarStates(calendar, Calendar.calendars);
        states.forEach(state => {
            updateNavigationButtons(state, today, Calendar.calendars);
        });
        
        updateMonthLabel(calendar, currentMonth, currentYear, MONTH_NAMES);
        this.markRange();
    }

    private markRange(): void {
        const { startDateRange, endDateRange, dayCache } = this.state;
        if (!startDateRange || !endDateRange) return;

        const startDate: Date = new Date(startDateRange.year, startDateRange.month, startDateRange.day);
        const endDate: Date = new Date(endDateRange.year, endDateRange.month, endDateRange.day);

        dayCache.forEach((dayInfo: DayInfo): void => {
            if (dayInfo.date >= startDate && dayInfo.date <= endDate && !dayInfo.element.classList.contains("active")) {
                dayInfo.element.classList.add('range');
            }
        });
    }

    private onDayClick(event: MouseEvent): void {
        const target: HTMLElement = event.currentTarget as HTMLElement;
        const day: number = parseInt(target.dataset.day!);
        const month: number = parseInt(target.dataset.month!);
        const year: number = parseInt(target.dataset.year!);

        const states: CalendarState[] = getCalendarStates(this.calendar, Calendar.calendars);

        states.forEach(state => {
            if (!state.startDateRange || state.endDateRange) {
                clearRange(states);
                state.startDateRange = { day, month, year };
                state.endDateRange = null;
                target.classList.add('active');
            } else {
                state.endDateRange = { day, month, year };
                if (new Date(year, month, day) < new Date(state.startDateRange.year, state.startDateRange.month, state.startDateRange.day)) {
                    [state.startDateRange, state.endDateRange] = [state.endDateRange, state.startDateRange];
                }
                target.classList.add('active');
                this.markRange();
            }
        });
    }

    public goToPreviousMonth(): void {
        const parent: HTMLElement = this.calendar.parentElement;
        let firstCalendarState: CalendarState | null = null;
        let secondCalendarState: CalendarState | null = null;

        if (parent && parent.classList.contains('combo-calendar')) {
            const moduleCalendars: HTMLElement[] = Array.from(parent.querySelectorAll('.module-calendar'));
            if (moduleCalendars.length === 2) {
                firstCalendarState = Calendar.calendars.get(moduleCalendars[0]);
                secondCalendarState = Calendar.calendars.get(moduleCalendars[1]);
            }
        }

        if (this.state.currentMonth === 0) {
            this.state.currentMonth = 11;
            this.state.currentYear--;
        } else {
            this.state.currentMonth--;
        }

        if (firstCalendarState && secondCalendarState) {
            if (this.state === secondCalendarState && (this.state.currentYear === firstCalendarState.currentYear && this.state.currentMonth === firstCalendarState.currentMonth)) {
                if (this.state.currentMonth === 11) {
                    this.state.currentMonth = 0;
                    this.state.currentYear++;
                } else {
                    this.state.currentMonth++;
                }
            }
        }

        this.populateCalendar();
    }

    public goToNextMonth(): void {
        const today: Date = new Date();
        const parent: HTMLElement = this.calendar.parentElement;
        let firstCalendarState: CalendarState | null = null;
        let secondCalendarState: CalendarState | null = null;

        if (parent && parent.classList.contains('combo-calendar')) {
            const moduleCalendars: HTMLElement[] = Array.from(parent.querySelectorAll('.module-calendar'));
            if (moduleCalendars.length === 2) {
                firstCalendarState = Calendar.calendars.get(moduleCalendars[0]);
                secondCalendarState = Calendar.calendars.get(moduleCalendars[1]);
            }
        }

        if (this.state.currentMonth === 11) {
            this.state.currentMonth = 0;
            this.state.currentYear++;
        } else {
            this.state.currentMonth++;
        }

        if (this.state.currentYear > today.getFullYear() || (this.state.currentYear === today.getFullYear() && this.state.currentMonth > today.getMonth())) {
            this.state.currentMonth = today.getMonth();
            this.state.currentYear = today.getFullYear();
        }

        if (firstCalendarState && secondCalendarState) {
            if (this.state === firstCalendarState && (this.state.currentYear === secondCalendarState.currentYear && this.state.currentMonth === secondCalendarState.currentMonth)) {
                if (this.state.currentMonth === 0) {
                    this.state.currentMonth = 11;
                    this.state.currentYear--;
                } else {
                    this.state.currentMonth--;
                }
            }
        }

        this.populateCalendar();
    }

    static calendars: Map<HTMLElement, CalendarState> = new Map<HTMLElement, CalendarState>();
}
