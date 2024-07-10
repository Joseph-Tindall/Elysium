/*import {CalendarState} from "./Element.Calendar.Interfaces";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const calendars: Map<HTMLElement, CalendarState> = new Map();

// Utility Functions
function getCalendarStates(calendar: HTMLElement): CalendarState[] {
    const parent: HTMLElement = calendar.parentElement;
    if (parent?.classList.contains('combo-calendar')) {
        return Array.from(parent.querySelectorAll('.module-calendar'))
            .map((module: HTMLElement) => calendars.get(module))
            .filter(Boolean) as CalendarState[];
    }
    return [calendars.get(calendar)].filter(Boolean) as CalendarState[];
}

function clearRange(states: CalendarState[]): void {
    states.forEach(state => state.dayCache.forEach(dayInfo => dayInfo.element.classList.remove("active", "range")));
}

function updateMonthLabel(calendar: HTMLElement, month: number, year: number): void {
    const label = calendar.querySelector(".calendar-month-label");
    if (label) {
        label.textContent = `${MONTH_NAMES[month]} ${year}`;
    }
}

function updateNavigationButtons(state: CalendarState, today: Date): void {
    const prevButton = state.calendar.querySelector(".prev-month") as HTMLButtonElement;
    const nextButton = state.calendar.querySelector(".next-month") as HTMLButtonElement;

    const parent = state.calendar.parentElement;
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

    prevButton.style.opacity = prevButton.disabled ? "0" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0" : "1";
}

// Population Functions
function populateCalendar(state: CalendarState): void {
    const { calendar, currentMonth, currentYear } = state;
    const daysContainer: HTMLElement = calendar.querySelector(".days");
    if (!daysContainer) return;

    while (daysContainer.children.length > 7) {
        daysContainer.removeChild(daysContainer.lastChild!);
    }

    const today: Date = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        daysContainer.appendChild(emptyCell);
    }

    state.dayCache.length = 0;
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "day";
        dayCell.textContent = day.toString();
        dayCell.dataset.day = day.toString();
        dayCell.dataset.month = currentMonth.toString();
        dayCell.dataset.year = currentYear.toString();

        dayCell.addEventListener('click', (event) => onDayClick(event, calendar));

        if (day === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
            dayCell.classList.add("today");
        }

        if (state.startDateRange && day === state.startDateRange.day && currentMonth === state.startDateRange.month && currentYear === state.startDateRange.year
            || state.endDateRange && day === state.endDateRange.day && currentMonth === state.endDateRange.month && currentYear === state.endDateRange.year) {
            dayCell.classList.add("active");
        }

        state.dayCache.push({ element: dayCell, date: new Date(currentYear, currentMonth, day) });
        daysContainer.appendChild(dayCell);
    }

    const states: CalendarState[] = getCalendarStates(calendar);
    states.forEach(state => {
        updateNavigationButtons(state, today);
    });

    updateMonthLabel(calendar, currentMonth, currentYear);
    markRange(state);
}

function markRange(state: CalendarState): void {
    const { startDateRange, endDateRange, dayCache } = state;
    if (!startDateRange || !endDateRange) return;

    const startDate = new Date(startDateRange.year, startDateRange.month, startDateRange.day);
    const endDate = new Date(endDateRange.year, endDateRange.month, endDateRange.day);

    dayCache.forEach(dayInfo => {
        if (dayInfo.date >= startDate && dayInfo.date <= endDate && !dayInfo.element.classList.contains("active")) {
            dayInfo.element.classList.add('range');
        }
    });
}

// Event Handlers
function onDayClick(event: MouseEvent, calendar: HTMLElement): void {
    const target = event.currentTarget as HTMLElement;
    const day = parseInt(target.dataset.day!);
    const month = parseInt(target.dataset.month!);
    const year = parseInt(target.dataset.year!);

    const states = getCalendarStates(calendar);

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
            markRange(state);
        }
    });
}

function goToPreviousMonth(event: Event): void {
    const button: HTMLElement = event.currentTarget as HTMLElement;
    const calendar: HTMLElement = button.closest('.module-calendar');
    if (!calendar) return;

    const state: CalendarState = calendars.get(calendar);
    if (!state) return;

    const parent = calendar.parentElement;
    let firstCalendarState: CalendarState | null = null;
    let secondCalendarState: CalendarState | null = null;

    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars: HTMLElement[] = Array.from(parent.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            firstCalendarState = calendars.get(moduleCalendars[0]);
            secondCalendarState = calendars.get(moduleCalendars[1]);
        }
    }

    if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear--;
    } else {
        state.currentMonth--;
    }

    if (firstCalendarState && secondCalendarState) {
        if (state === secondCalendarState && (state.currentYear === firstCalendarState.currentYear && state.currentMonth === firstCalendarState.currentMonth)) {
            if (state.currentMonth === 11) {
                state.currentMonth = 0;
                state.currentYear++;
            } else {
                state.currentMonth++;
            }
        }
    }

    populateCalendar(state);
}

function goToNextMonth(event: Event): void {
    const button: HTMLElement = event.currentTarget as HTMLElement;
    const calendar: HTMLElement = button.closest('.module-calendar');
    if (!calendar) return;

    const state = calendars.get(calendar);
    if (!state) return;

    const today = new Date();
    const parent = calendar.parentElement;
    let firstCalendarState: CalendarState | null = null;
    let secondCalendarState: CalendarState | null = null;

    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars: HTMLElement[] = Array.from(parent.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            firstCalendarState = calendars.get(moduleCalendars[0]);
            secondCalendarState = calendars.get(moduleCalendars[1]);
        }
    }

    if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear++;
    } else {
        state.currentMonth++;
    }

    if (state.currentYear > today.getFullYear() || (state.currentYear === today.getFullYear() && state.currentMonth > today.getMonth())) {
        state.currentMonth = today.getMonth();
        state.currentYear = today.getFullYear();
    }

    if (firstCalendarState && secondCalendarState) {
        if (state === firstCalendarState && (state.currentYear === secondCalendarState.currentYear && state.currentMonth === secondCalendarState.currentMonth)) {
            if (state.currentMonth === 0) {
                state.currentMonth = 11;
                state.currentYear--;
            } else {
                state.currentMonth--;
            }
        }
    }

    populateCalendar(state);
}

// Initialization
document.addEventListener("DOMContentLoaded", (): void => {
    document.querySelectorAll('.module-calendar').forEach((calendar: HTMLElement) => {
        const today = new Date();
        const state: CalendarState = {
            calendar: calendar,
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            startDateRange: null,
            endDateRange: null,
            dayCache: []
        };

        calendars.set(calendar, state);
        populateCalendar(state);

        const prevButton = calendar.querySelector(".prev-month");
        const nextButton = calendar.querySelector(".next-month");

        prevButton?.addEventListener("click", goToPreviousMonth);
        nextButton?.addEventListener("click", goToNextMonth);
    });

    document.querySelectorAll('.combo-calendar').forEach((combo: HTMLElement) => {
        const moduleCalendars: HTMLElement[] = Array.from(combo.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            const today = new Date();
            const firstCalendarState = calendars.get(moduleCalendars[0]);
            const secondCalendarState = calendars.get(moduleCalendars[1]);

            firstCalendarState.currentMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
            firstCalendarState.currentYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
            secondCalendarState.currentMonth = today.getMonth();
            secondCalendarState.currentYear = today.getFullYear();

            populateCalendar(firstCalendarState);
            populateCalendar(secondCalendarState);
        }
    });
});*/