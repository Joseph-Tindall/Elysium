import { Calendar } from './States.js';
export function initializeCalendars() {
    document.querySelectorAll('.module-calendar').forEach((calendarElement) => {
        const calendar = new Calendar(calendarElement);
        Calendar.calendars.set(calendarElement, calendar.state);
        calendar.populateCalendar(calendar.state.currentMonth, calendar.state.currentYear);
        const prevButton = calendarElement.querySelector('.prev-month');
        const nextButton = calendarElement.querySelector('.next-month');
        prevButton === null || prevButton === void 0 ? void 0 : prevButton.addEventListener('click', () => calendar.goToPreviousMonth());
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener('click', () => calendar.goToNextMonth());
    });
    document.querySelectorAll('.combo-calendar').forEach((combo) => {
        const moduleCalendars = Array.from(combo.querySelectorAll('.module-calendar'));
        if (moduleCalendars.length === 2) {
            const today = new Date();
            const firstCalendar = Calendar.calendars.get(moduleCalendars[0]);
            const secondCalendar = Calendar.calendars.get(moduleCalendars[1]);
            firstCalendar.currentMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
            firstCalendar.currentYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
            secondCalendar.currentMonth = today.getMonth();
            secondCalendar.currentYear = today.getFullYear();
            new Calendar(moduleCalendars[0]).populateCalendar(firstCalendar.currentMonth, firstCalendar.currentYear);
            new Calendar(moduleCalendars[1]).populateCalendar(secondCalendar.currentMonth, secondCalendar.currentYear);
        }
    });
}
//# sourceMappingURL=Events.js.map