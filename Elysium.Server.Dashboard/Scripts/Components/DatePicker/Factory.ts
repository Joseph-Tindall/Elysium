import { Module } from "../Module/Factory.js";
import { Calendar } from "../Calendar/Factory.js";
import { EInteractions } from "../../Enumerations/EInteractions.js";
import { shortMonths } from "../Calendar/Constants.js";
import { LabelSideControls } from "../Label/LabelSideControls.js";

export class DatePicker
{
    constructor(initialDate: Date = new Date()) {
        const module: Module = new Module();

        const calendar: Calendar = new Calendar(
            initialDate,
            EInteractions.Enabled,
            true,
            false,
            'date-picker'
        );

        const initialLabel: string = shortMonths[initialDate.getMonth()] + ' ' + initialDate.getFullYear().toString();
        const label: LabelSideControls = new LabelSideControls(module.element, initialLabel);
        label.leftControl.setMethod(calendar.scrollToPreviousMonth);
        label.rightControl.setMethod(calendar.scrollToNextMonth);

        module.element.appendChild(label.element);
        module.element.appendChild(calendar.element);
        return this;
    }
}