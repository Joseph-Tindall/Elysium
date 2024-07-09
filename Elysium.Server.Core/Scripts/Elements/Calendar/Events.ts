import { Calendar } from './States.js';
import { CalendarState } from './Interfaces.js';

export function initializeCalendars(): void {
    document.querySelectorAll('.module-calendar').forEach((calendarElement: HTMLElement) => {
        const calendar: Calendar = new Calendar(calendarElement);
        Calendar.calendars.set(calendarElement, calendar.state);

        calendar.populateCalendar(calendar.state.currentMonth, calendar.state.currentYear);

        const prevButton: HTMLButtonElement = calendarElement.querySelector('.prev-month');
        const nextButton: HTMLButtonElement = calendarElement.querySelector('.next-month');

        prevButton?.addEventListener('click', () => calendar.goToPreviousMonth());
        nextButton?.addEventListener('click', () => calendar.goToNextMonth());
    });

    document.querySelectorAll('.combo-calendar').forEach((combo: HTMLElement) => {
        const moduleCalendars: HTMLElement[] = Array.from(combo.querySelectorAll('.module-calendar'));
        
        if (moduleCalendars.length === 2) {
            const today: Date = new Date();
            const firstCalendar: CalendarState = Calendar.calendars.get(moduleCalendars[0]);
            const secondCalendar: CalendarState = Calendar.calendars.get(moduleCalendars[1]);

            firstCalendar.currentMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
            firstCalendar.currentYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
            secondCalendar.currentMonth = today.getMonth();
            secondCalendar.currentYear = today.getFullYear();

            new Calendar(moduleCalendars[0]).populateCalendar(firstCalendar.currentMonth, firstCalendar.currentYear);
            new Calendar(moduleCalendars[1]).populateCalendar(secondCalendar.currentMonth, secondCalendar.currentYear);
        }
    });
}
