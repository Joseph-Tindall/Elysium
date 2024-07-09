interface DayInfo {
    element: HTMLElement;
    date: Date;
}

interface CalendarState {
    currentMonth: number;
    currentYear: number;
    startDateRange: { day: number, month: number, year: number } | null;
    endDateRange: { day: number, month: number, year: number } | null;
    dayCache: DayInfo[];
}

const calendars: Map<HTMLElement, CalendarState> = new Map();

function getCalendarStates(calendar: HTMLElement): CalendarState[] {
    const states: CalendarState[] = [];
    const parent: HTMLElement | null = calendar.parentElement;

    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars: HTMLElement[] = Array.from(parent.querySelectorAll('.module-calendar'));
        moduleCalendars.forEach(moduleCalendar => {
            const childState = calendars.get(moduleCalendar);
            if (childState) states.push(childState);
        });
    } else {
        const state: CalendarState = calendars.get(calendar);
        if (state) states.push(state);
    }

    return states;
}

function clearRange(calendar: HTMLElement): void {
    const states = getCalendarStates(calendar);
    states.forEach(state => {
        state.dayCache.forEach(dayInfo => {
            dayInfo.element.classList.remove("active", "range");
        });
    });
}

function populateCalendar(calendar: HTMLElement, month: number, year: number): void {
    const daysContainer = calendar.querySelector<HTMLElement>(".days");
    if (!daysContainer) return;

    while (daysContainer.children.length > 7) {
        daysContainer.removeChild(daysContainer.lastChild!);
    }

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        daysContainer.appendChild(emptyCell);
    }

    const state = calendars.get(calendar);
    if (!state) return;

    state.dayCache.length = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");

        dayCell.className = "day";
        dayCell.textContent = day.toString();
        dayCell.dataset.day = day.toString();
        dayCell.dataset.month = month.toString();
        dayCell.dataset.year = year.toString();

        dayCell.addEventListener('click', (event) => onDayClick(event, calendar));

        if (day === todayDate && month === todayMonth && year === todayYear) {
            dayCell.classList.add("today");
        }

        if ((state.startDateRange && day === state.startDateRange.day && month === state.startDateRange.month && year === state.startDateRange.year) ||
            (state.endDateRange && day === state.endDateRange.day && month === state.endDateRange.month && year === state.endDateRange.year)) {
            dayCell.classList.add("active");
        }

        const dayDate = new Date(year, month, day);
        state.dayCache.push({ element: dayCell, date: dayDate });

        daysContainer.appendChild(dayCell);
    }

    updateMonthLabel(calendar, month, year);
    updateNavigationButtons(calendar);
    markRange(calendar);
}

function onDayClick(event: MouseEvent, calendar: HTMLElement): void {
    const target = event.currentTarget as HTMLElement;
    const day = parseInt(target.dataset.day!);
    const month = parseInt(target.dataset.month!);
    const year = parseInt(target.dataset.year!);
    const states = getCalendarStates(calendar);

    states.forEach(state => {
        if (!state.startDateRange || state.endDateRange) {
            clearRange(calendar);
            state.startDateRange = { day, month, year };
            state.endDateRange = null;
            target.classList.add('active');
        } else {
            state.endDateRange = { day, month, year };

            if (new Date(year, month, day) < new Date(state.startDateRange.year, state.startDateRange.month, state.startDateRange.day)) {
                state.endDateRange = state.startDateRange;
                state.startDateRange = { day, month, year };
            }

            target.classList.add('active');
            markRange(calendar);
        }
    });
}

function markRange(calendar: HTMLElement): void {
    const states = getCalendarStates(calendar);
    states.forEach(state => {
        if (!state || !state.startDateRange || !state.endDateRange) return;

        const startDate = new Date(state.startDateRange.year, state.startDateRange.month, state.startDateRange.day);
        const endDate = new Date(state.endDateRange.year, state.endDateRange.month, state.endDateRange.day);

        state.dayCache.forEach(dayInfo => {
            const currentDate = dayInfo.date;
            if (currentDate >= startDate && currentDate <= endDate) {
                dayInfo.element.classList.toggle('range', !dayInfo.element.classList.contains("active"));
            }
        });
    });
}

function updateMonthLabel(calendar: HTMLElement, month: number, year: number): void {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const label = calendar.querySelector(".calendar-month-label");
    if (label) {
        label.textContent = `${monthNames[month]} ${year}`;
    }
}

function updateNavigationButtons(calendar: HTMLElement): void {
    const today = new Date();
    const prevButton = calendar.querySelector<HTMLButtonElement>(".prev-month");
    const nextButton = calendar.querySelector<HTMLButtonElement>(".next-month");

    const state = calendars.get(calendar);
    if (!state || !prevButton || !nextButton) return;

    prevButton.disabled = false;
    nextButton.disabled = (state.currentYear === today.getFullYear() && state.currentMonth === today.getMonth());

    prevButton.style.opacity = "1";
    nextButton.style.opacity = nextButton.disabled ? "0" : "1";
}

function changeMonth(calendar: HTMLElement, increment: number): void {
    const state = calendars.get(calendar);
    if (!state) return;

    state.currentMonth += increment;

    if (state.currentMonth > 11) {
        state.currentMonth = 0;
        state.currentYear++;
    } else if (state.currentMonth < 0) {
        state.currentMonth = 11;
        state.currentYear--;
    }

    const today = new Date();
    if (state.currentYear > today.getFullYear() || (state.currentYear === today.getFullYear() && state.currentMonth > today.getMonth())) {
        state.currentMonth = today.getMonth();
        state.currentYear = today.getFullYear();
    }

    populateCalendar(calendar, state.currentMonth, state.currentYear);
}

document.addEventListener("DOMContentLoaded", (): void => {
    document.querySelectorAll('.module-calendar').forEach((calendar: HTMLElement) => {
        const today = new Date();
        const state: CalendarState = {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            startDateRange: null,
            endDateRange: null,
            dayCache: []
        };

        calendars.set(calendar, state);
        populateCalendar(calendar, state.currentMonth, state.currentYear);

        const prevButton = calendar.querySelector(".prev-month");
        const nextButton = calendar.querySelector(".next-month");

        prevButton?.addEventListener("click", () => changeMonth(calendar, -1));
        nextButton?.addEventListener("click", () => changeMonth(calendar, 1));
    });
});