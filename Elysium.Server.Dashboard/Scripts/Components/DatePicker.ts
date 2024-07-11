import { Module } from './Module/Factory.js';
import { Calendar } from './Calendar/Factory.js';
import { EInteractions } from "../Enumerations/EInteractions.js";

function createDatePicker(initialDate: Date = new Date()): void {
    const module: Module = new Module();
    const calendar: Calendar = new Calendar(
        initialDate,
        EInteractions.Enabled, 
        true, 
        true, 
        'date-picker'
    );

    module.element.appendChild(calendar.element);
}

document.addEventListener('DOMContentLoaded', (): void => {
    createDatePicker();
});