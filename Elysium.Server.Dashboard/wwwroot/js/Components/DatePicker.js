import { Module } from './Module/Factory.js';
import { Calendar } from './Calendar/Factory.js';
import { EInteractions } from "../Enumerations/EInteractions.js";
function createDatePicker(initialDate = new Date()) {
    const module = new Module();
    const calendar = new Calendar(initialDate, EInteractions.Enabled, true, false, 'date-picker');
    module.element.appendChild(calendar.element);
}
document.addEventListener('DOMContentLoaded', () => {
    createDatePicker();
});
//# sourceMappingURL=DatePicker.js.map