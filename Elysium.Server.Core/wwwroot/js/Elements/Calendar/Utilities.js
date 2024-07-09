export function getCalendarStates(calendar, calendars) {
    const parent = calendar.parentElement;
    if (parent === null || parent === void 0 ? void 0 : parent.classList.contains('combo-calendar')) {
        return Array.from(parent.querySelectorAll('.module-calendar'))
            .map((module) => calendars.get(module))
            .filter(Boolean);
    }
    return [calendars.get(calendar)].filter(Boolean);
}
export function clearRange(states) {
    states.forEach((state) => state.dayCache.forEach((dayInfo) => dayInfo.element.classList.remove("active", "range")));
}
export function updateMonthLabel(calendar, month, year, MONTH_NAMES) {
    const label = calendar.querySelector(".calendar-month-label");
    if (label) {
        label.textContent = `${MONTH_NAMES[month]} ${year}`;
    }
}
export function updateNavigationButtons(state, today, calendars) {
    const prevButton = state.calendar.querySelector(".prev-month");
    const nextButton = state.calendar.querySelector(".next-month");
    const parent = state.calendar.parentElement;
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
        if (state === secondCalendarState) {
            nextButton.disabled = (state.currentYear === today.getFullYear() && state.currentMonth === today.getMonth());
            prevButton.disabled = (state.currentMonth === firstCalendarState.currentMonth + 1 && state.currentYear === firstCalendarState.currentYear)
                || (state.currentMonth === 0 && firstCalendarState.currentMonth === 11 && state.currentYear === firstCalendarState.currentYear + 1);
        }
        else if (state === firstCalendarState) {
            nextButton.disabled = (state.currentMonth === 11 && secondCalendarState.currentMonth === 0 && state.currentYear === secondCalendarState.currentYear - 1)
                || (state.currentMonth === secondCalendarState.currentMonth - 1 && state.currentYear === secondCalendarState.currentYear);
        }
    }
    prevButton.style.opacity = prevButton.disabled ? "0" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0" : "1";
}
//# sourceMappingURL=Utilities.js.map