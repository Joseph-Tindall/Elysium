import { Module } from './Module/Factory.js';
import { Calendar } from './Calendar/Factory.js';
import { shortMonths } from "./Calendar/Constants.js";
import { EInteractions } from "../Enumerations/EInteractions.js";
import { LabelSideControls } from "./Label/LabelSideControls.js";
function createDatePicker(initialDate = new Date()) {
    const module = new Module();
    const calendar = new Calendar(initialDate, EInteractions.Enabled, true, false, 'date-picker');
    const initialLabel = shortMonths[initialDate.getMonth()] + ' ' + initialDate.getFullYear().toString();
    const label = new LabelSideControls(module.element, initialLabel);
    label.leftControl.setMethod(calendar.scrollToPreviousMonth);
    label.rightControl.setMethod(calendar.scrollToNextMonth);
    module.element.appendChild(label.element);
    module.element.appendChild(calendar.element);
}
document.addEventListener('DOMContentLoaded', () => {
    createDatePicker();
});
//# sourceMappingURL=DatePicker.js.map