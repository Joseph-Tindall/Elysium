import { Module } from "../Module/Factory.js";
import { Button } from "../Button/Factory.js";
import { Calendar } from "../Calendar/Factory.js";
import { shortMonths } from "../Calendar/Constants.js";
import { EInteractions } from "../../Enumerations/EInteractions.js";
import { LabelSideControls } from "../Label/LabelSideControls.js";
import { Group } from "../../Elements/Group.js";
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
        this.clearSelection = () => {
            this.calendar.resetCycle();
            this.calendar.highlightDayRange();
        };
        this.close = () => {
            this.label.leftControl.setMethod(null);
            this.label.rightControl.setMethod(null);
            this.clearSelection = () => { };
            this.container.element.remove();
            this.container = null;
            this.calendar = null;
            this.label = null;
        };
        this.applySelection = () => {
            this.close();
        };
        this.maximumDate = maximumDate;
        if (minimumDate)
            this.minimumDate = minimumDate;
        this.calendar = new Calendar(initialDate, EInteractions.Enabled, true, false, 'date-picker');
        this.container = new Module();
        this.label = new LabelSideControls(this.container.element);
        this.label.leftControl.setMethod(this.handlePreviousMonth);
        this.label.rightControl.setMethod(this.handleNextMonth);
        this.updateLabel();
        this.container.element.appendChild(this.label.element);
        this.container.element.appendChild(this.calendar.element);
        const buttonGroup = new Group();
        const clearButton = new Button('Clear', this.clearSelection);
        const cancelButton = new Button('Cancel', this.close);
        const applyButton = new Button('Apply', this.applySelection, 'action');
        buttonGroup.element.appendChild(clearButton.element);
        buttonGroup.addSpacer();
        buttonGroup.element.appendChild(cancelButton.element);
        buttonGroup.element.appendChild(applyButton.element);
        this.container.element.appendChild(buttonGroup.element);
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