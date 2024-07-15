import { Module } from './Module/Factory.js';
import { Calendar } from './Calendar/Factory.js';
import { EInteractions } from "../Enumerations/EInteractions.js";
import { LabelSideControls } from "./Label/LabelSideControls.js";
function createDatePicker(initialDate = new Date()) {
    const module = new Module();
    const calendar = new Calendar(initialDate, EInteractions.Enabled, true, false, 'date-picker');
    const label = new LabelSideControls(module.element, 'Jun 2024');
    label.leftControl.setMethod(calendar.scrollToPreviousMonth);
    label.rightControl.setMethod(calendar.scrollToNextMonth);
    module.element.appendChild(label.element);
    module.element.appendChild(calendar.element);
}
document.addEventListener('DOMContentLoaded', () => {
    createDatePicker();
});
//# sourceMappingURL=DatePicker.js.map