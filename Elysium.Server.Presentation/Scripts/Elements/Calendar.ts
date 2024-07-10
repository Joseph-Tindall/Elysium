import { Calendar } from './Calendar/Factory.js';

function generateCalendar(): void {
    new Calendar();
}

document.addEventListener('DOMContentLoaded', (): void => {
    generateCalendar();
});