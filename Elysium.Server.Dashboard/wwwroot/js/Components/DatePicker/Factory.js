import { Module } from "../Module/Factory.js";
import { Calendar } from "../Calendar/Factory.js";
import { EInteractions } from "../../Enumerations/EInteractions.js";
import { shortMonths } from "../Calendar/Constants.js";
import { LabelSideControls } from "../Label/LabelSideControls.js";
export class DatePicker {
    constructor(initialDate = new Date(), maximumDate = new Date(), minimumDate) {
        this.handlePreviousMonth = () => {
            if (this.minimumDate) {
                const currentMonth = Number(this.calendar.element.dataset.month);
                const currentYear = Number(this.calendar.element.dataset.year);
                if (currentMonth <= this.minimumDate.getMonth() && currentYear <= this.minimumDate.getFullYear()) {
                    return;
                }
            }
            this.calendar.scrollToPreviousMonth();
            this.updateLabel();
        };
        this.handleNextMonth = () => {
            if (this.maximumDate) {
                const currentMonth = Number(this.calendar.element.dataset.month);
                const currentYear = Number(this.calendar.element.dataset.year);
                if (currentMonth >= this.maximumDate.getMonth() && currentYear >= this.maximumDate.getFullYear()) {
                    return;
                }
            }
            this.calendar.scrollToNextMonth();
            this.updateLabel();
        };
        this.maximumDate = maximumDate;
        if (minimumDate)
            this.minimumDate = minimumDate;
        this.calendar = new Calendar(initialDate, EInteractions.Enabled, true, false, 'date-picker');
        const module = new Module();
        this.label = new LabelSideControls(module.element);
        this.label.leftControl.setMethod(this.handlePreviousMonth);
        this.label.rightControl.setMethod(this.handleNextMonth);
        this.updateLabel();
        module.element.appendChild(this.label.element);
        module.element.appendChild(this.calendar.element);
        return this;
    }
    setMaximumDate(date) {
        this.maximumDate = date;
        this.updateLabel();
    }
    setMinimumDate(date) {
        this.minimumDate = date;
        this.updateLabel();
    }
    updateLabel() {
        const month = Number(this.calendar.element.dataset.month);
        const year = Number(this.calendar.element.dataset.year);
        this.label.setLabel(shortMonths[month] + ' ' + year.toString());
        this.label.leftControl.setState(!(this.minimumDate && month === this.minimumDate.getMonth() && year === this.minimumDate.getFullYear()) || !this.minimumDate);
        this.label.rightControl.setState(!(this.maximumDate && month === this.maximumDate.getMonth() && year === this.maximumDate.getFullYear()) || !this.maximumDate);
    }
}
//# sourceMappingURL=Factory.js.map