const calendars = new Map();
function clearRange(calendar) {
    const states = getCalendarStates(calendar);
    states.forEach(state => {
        state.dayCache.forEach(dayInfo => {
            dayInfo.element.classList.remove("active", "range");
        });
    });
}
function getCalendarStates(calendar) {
    const states = [];
    const parent = calendar.parentElement;
    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars = Array.from(parent.querySelectorAll('.module-calendar'));
        moduleCalendars.forEach(moduleCalendar => {
            const childState = calendars.get(moduleCalendar);
            if (childState)
                states.push(childState);
        });
    }
    else {
        const state = calendars.get(calendar);
        if (state)
            states.push(state);
    }
    return states;
}
function populateCalendar(calendar, month, year) {
    const daysContainer = calendar.querySelector(".days");
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
        const emptyCell = document.createElement("div");
        daysContainer.appendChild(emptyCell);
    }
    const state = calendars.get(calendar);
    if (!state)
        return;
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
        if ((state.startDateRange != null && day === state.startDateRange.day && month === state.startDateRange.month && year === state.startDateRange.year)
            || (state.endDateRange != null && day === state.endDateRange.day && month === state.endDateRange.month && year === state.endDateRange.year)) {
            dayCell.classList.add("active");
        }
        const dayDate = new Date(year, month, day);
        state.dayCache.push({ element: dayCell, date: dayDate });
        daysContainer.appendChild(dayCell);
    }
    updateMonthLabel(calendar, month, year);
    markRange(calendar);
    const states = getCalendarStates(calendar);
    states.forEach(state => {
        updateNavigationButtons(state.calendar);
    });
}
function onDayClick(event, calendar) {
    const target = event.currentTarget;
    const day = parseInt(target.dataset.day);
    const month = parseInt(target.dataset.month);
    const year = parseInt(target.dataset.year);
    const states = getCalendarStates(calendar);
    states.forEach(state => {
        if (!state.startDateRange || state.endDateRange) {
            clearRange(calendar);
            state.startDateRange = { day, month, year };
            state.endDateRange = null;
            target.classList.add('active');
        }
        else {
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
function markRange(calendar) {
    const states = getCalendarStates(calendar);
    states.forEach(state => {
        if (!state || !state.startDateRange || !state.endDateRange)
            return;
        const startDate = new Date(state.startDateRange.year, state.startDateRange.month, state.startDateRange.day);
        const endDate = new Date(state.endDateRange.year, state.endDateRange.month, state.endDateRange.day);
        state.dayCache.forEach(dayInfo => {
            const currentDate = dayInfo.date;
            if (currentDate >= startDate && currentDate <= endDate && !dayInfo.element.classList.contains("active")) {
                dayInfo.element.classList.add('range');
            }
        });
    });
}
function updateMonthLabel(calendar, month, year) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const label = calendar.querySelector(".calendar-month-label");
    if (label) {
        label.textContent = `${monthNames[month]} ${year}`;
    }
}
function updateNavigationButtons(calendar) {
    const today = new Date();
    const prevButton = calendar.querySelector(".prev-month");
    const nextButton = calendar.querySelector(".next-month");
    const state = calendars.get(calendar);
    if (!state)
        return;
    const parent = calendar.parentElement;
    let firstCalendarState = null;
    let secondCalendarState = null;
    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars = Array.from(parent.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            firstCalendarState = calendars.get(moduleCalendars[0]);
            secondCalendarState = calendars.get(moduleCalendars[1]);
        }
    }
    prevButton.disabled = false;
    nextButton.disabled = false;
    if (firstCalendarState && secondCalendarState) {
        if (secondCalendarState && state === secondCalendarState) {
            nextButton.disabled = (state.currentYear === today.getFullYear() && state.currentMonth === today.getMonth());
            if ((state.currentMonth === firstCalendarState.currentMonth + 1 && state.currentYear === firstCalendarState.currentYear)
                || (state.currentMonth === 0 && firstCalendarState.currentMonth === 11 && state.currentYear === firstCalendarState.currentYear + 1)) {
                prevButton.disabled = true;
            }
        }
        else if (firstCalendarState && state === firstCalendarState) {
            if ((state.currentMonth === 11 && secondCalendarState.currentMonth === 0 && state.currentYear === secondCalendarState.currentYear - 1)
                || (state.currentMonth === secondCalendarState.currentMonth - 1 && state.currentYear === secondCalendarState.currentYear)) {
                nextButton.disabled = true;
            }
        }
    }
    prevButton.style.opacity = prevButton.disabled ? "0" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0" : "1";
}
function goToPreviousMonth(event) {
    const button = event.currentTarget;
    const calendar = button.closest('.module-calendar');
    if (!calendar)
        return;
    const state = calendars.get(calendar);
    if (!state)
        return;
    const parent = calendar.parentElement;
    let firstCalendarState = null;
    let secondCalendarState = null;
    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars = Array.from(parent.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            firstCalendarState = calendars.get(moduleCalendars[0]);
            secondCalendarState = calendars.get(moduleCalendars[1]);
        }
    }
    if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear--;
    }
    else {
        state.currentMonth--;
    }
    if (secondCalendarState && state === secondCalendarState && (state.currentYear === firstCalendarState.currentYear && state.currentMonth === firstCalendarState.currentMonth)) {
        if (state.currentMonth === 11) {
            state.currentMonth = 0;
            state.currentYear++;
        }
        else {
            state.currentMonth++;
        }
    }
    populateCalendar(calendar, state.currentMonth, state.currentYear);
}
function goToNextMonth(event) {
    const button = event.currentTarget;
    const calendar = button.closest('.module-calendar');
    if (!calendar)
        return;
    const state = calendars.get(calendar);
    if (!state)
        return;
    const today = new Date();
    const parent = calendar.parentElement;
    let firstCalendarState = null;
    let secondCalendarState = null;
    if (parent && parent.classList.contains('combo-calendar')) {
        const moduleCalendars = Array.from(parent.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            firstCalendarState = calendars.get(moduleCalendars[0]);
            secondCalendarState = calendars.get(moduleCalendars[1]);
        }
    }
    if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear++;
    }
    else {
        state.currentMonth++;
    }
    if (state.currentYear > today.getFullYear() || (state.currentYear === today.getFullYear() && state.currentMonth > today.getMonth())) {
        state.currentMonth = today.getMonth();
        state.currentYear = today.getFullYear();
    }
    if (firstCalendarState && state === firstCalendarState && (state.currentYear === secondCalendarState.currentYear && state.currentMonth === secondCalendarState.currentMonth)) {
        if (state.currentMonth === 0) {
            state.currentMonth = 11;
            state.currentYear--;
        }
        else {
            state.currentMonth--;
        }
    }
    populateCalendar(calendar, state.currentMonth, state.currentYear);
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.module-calendar').forEach((calendar) => {
        const today = new Date();
        const state = {
            calendar: calendar,
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
        prevButton === null || prevButton === void 0 ? void 0 : prevButton.addEventListener("click", goToPreviousMonth);
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener("click", goToNextMonth);
    });
    document.querySelectorAll('.combo-calendar').forEach((combo) => {
        const moduleCalendars = Array.from(combo.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            const today = new Date();
            const firstCalendarState = calendars.get(moduleCalendars[0]);
            const secondCalendarState = calendars.get(moduleCalendars[1]);
            firstCalendarState.currentMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
            firstCalendarState.currentYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
            secondCalendarState.currentMonth = today.getMonth();
            secondCalendarState.currentYear = today.getFullYear();
            populateCalendar(moduleCalendars[0], firstCalendarState.currentMonth, firstCalendarState.currentYear);
            populateCalendar(moduleCalendars[1], secondCalendarState.currentMonth, secondCalendarState.currentYear);
        }
    });
});
//# sourceMappingURL=Element.Calendar.js.map