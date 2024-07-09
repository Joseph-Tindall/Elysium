import { MONTH_NAMES } from './Interfaces.js';
import { getCalendarStates, clearRange, updateMonthLabel, updateNavigationButtons } from './Utilities.js';
export class Calendar {
    constructor(calendar) {
        const today = new Date();
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
    populateCalendar(month, year) {
        const { calendar } = this.state;
        const daysContainer = calendar.querySelector('.days');
        if (!daysContainer)
            return;
        while (daysContainer.children.length > 7) {
            daysContainer.removeChild(daysContainer.lastChild);
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
            const emptyCell = document.createElement('div');
            daysContainer.appendChild(emptyCell);
        }
        this.state.dayCache.length = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day';
            dayCell.textContent = day.toString();
            dayCell.dataset.day = day.toString();
            dayCell.dataset.month = month.toString();
            dayCell.dataset.year = year.toString();
            dayCell.addEventListener('click', (event) => this.onDayClick(event));
            if (day === todayDate && month === todayMonth && year === todayYear) {
                dayCell.classList.add('today');
            }
            if (this.state.startDateRange && day === this.state.startDateRange.day && month === this.state.startDateRange.month && year === this.state.startDateRange.year
                || this.state.endDateRange && day === this.state.endDateRange.day && month === this.state.endDateRange.month && year === this.state.endDateRange.year) {
                dayCell.classList.add('active');
            }
            this.state.dayCache.push({ element: dayCell, date: new Date(year, month, day) });
            daysContainer.appendChild(dayCell);
        }
        const states = getCalendarStates(calendar, Calendar.calendars);
        states.forEach((state) => {
            updateNavigationButtons(state, today, Calendar.calendars);
        });
        updateMonthLabel(calendar, month, year, MONTH_NAMES);
        this.markRange();
    }
    markRange() {
        const states = getCalendarStates(this.calendar, Calendar.calendars);
        states.forEach((state) => {
            const { startDateRange, endDateRange, dayCache } = state;
            if (!startDateRange || !endDateRange)
                return;
            const startDate = new Date(startDateRange.year, startDateRange.month, startDateRange.day);
            const endDate = new Date(endDateRange.year, endDateRange.month, endDateRange.day);
            dayCache.forEach((dayInfo) => {
                if (dayInfo.date >= startDate && dayInfo.date <= endDate && !dayInfo.element.classList.contains('active')) {
                    dayInfo.element.classList.add('range');
                }
            });
        });
    }
    onDayClick(event) {
        const target = event.currentTarget;
        const day = parseInt(target.dataset.day);
        const month = parseInt(target.dataset.month);
        const year = parseInt(target.dataset.year);
        const states = getCalendarStates(this.calendar, Calendar.calendars);
        states.forEach(state => {
            if (!state.startDateRange || state.endDateRange) {
                clearRange(states);
                state.startDateRange = { day, month, year };
                state.endDateRange = null;
                target.classList.add('active');
            }
            else {
                state.endDateRange = { day, month, year };
                if (new Date(year, month, day) < new Date(state.startDateRange.year, state.startDateRange.month, state.startDateRange.day)) {
                    [state.startDateRange, state.endDateRange] = [state.endDateRange, state.startDateRange];
                }
                target.classList.add('active');
                this.markRange();
            }
        });
    }
    goToPreviousMonth() {
        const parent = this.calendar.parentElement;
        let firstCalendarState = null;
        let secondCalendarState = null;
        if (parent && parent.classList.contains('combo-calendar')) {
            const moduleCalendars = Array.from(parent.querySelectorAll('.module-calendar'));
            if (moduleCalendars.length === 2) {
                firstCalendarState = Calendar.calendars.get(moduleCalendars[0]);
                secondCalendarState = Calendar.calendars.get(moduleCalendars[1]);
            }
        }
        if (this.state.currentMonth === 0) {
            this.state.currentMonth = 11;
            this.state.currentYear--;
        }
        else {
            this.state.currentMonth--;
        }
        if (firstCalendarState && secondCalendarState) {
            if (this.state === secondCalendarState && (this.state.currentYear === firstCalendarState.currentYear && this.state.currentMonth === firstCalendarState.currentMonth)) {
                if (this.state.currentMonth === 11) {
                    this.state.currentMonth = 0;
                    this.state.currentYear++;
                }
                else {
                    this.state.currentMonth++;
                }
            }
        }
        this.populateCalendar(this.state.currentMonth, this.state.currentYear);
    }
    goToNextMonth() {
        const today = new Date();
        const parent = this.calendar.parentElement;
        let firstCalendarState = null;
        let secondCalendarState = null;
        if (parent && parent.classList.contains('combo-calendar')) {
            const moduleCalendars = Array.from(parent.querySelectorAll('.module-calendar'));
            if (moduleCalendars.length === 2) {
                firstCalendarState = Calendar.calendars.get(moduleCalendars[0]);
                secondCalendarState = Calendar.calendars.get(moduleCalendars[1]);
            }
        }
        if (this.state.currentMonth === 11) {
            this.state.currentMonth = 0;
            this.state.currentYear++;
        }
        else {
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
                }
                else {
                    this.state.currentMonth--;
                }
            }
        }
        this.populateCalendar(this.state.currentMonth, this.state.currentYear);
    }
}
Calendar.calendars = new Map();
//# sourceMappingURL=States.js.map