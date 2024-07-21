import { Dropdown } from "../Button/Dropdown.js";
import { EQuickDates } from "../../Enumerations/EQuickDates.js";
import { getLastDayOfMonth } from "../Calendar/Utilities.js";
export class DatePickerButton {
    constructor(button) {
        this.handleClickEvent = (event) => {
            const clickedElement = event.target;
            if (clickedElement.tagName.toLowerCase() === 'option') {
                this.interpretSelection(clickedElement);
                return;
            }
            const parentElement = clickedElement.parentElement;
            if (parentElement && parentElement.tagName.toLowerCase() === 'option') {
                this.interpretSelection(parentElement);
                return;
            }
        };
        this.buttonElement = button;
        this.labelElement = button.querySelector('span[role="textbox"]');
        if (!this.labelElement)
            return;
        this.addEventListeners();
        this.setInitialDateRange();
        return this;
    }
    addEventListeners() {
        this.buttonElement.onclick = () => {
            this.dropdown = new Dropdown(this.buttonElement);
            this.dropdown.addOption('Last 7 days', this.handleClickEvent);
            this.dropdown.addOption('Last 14 days', this.handleClickEvent);
            this.dropdown.addOption('This month', this.handleClickEvent);
            this.dropdown.addOption('Last month', this.handleClickEvent);
            this.dropdown.addOption('This year', this.handleClickEvent);
            this.dropdown.addOption('Last year', this.handleClickEvent);
            this.dropdown.addOption('Custom date range', this.handleClickEvent);
        };
    }
    setInitialDateRange() {
        const today = new Date();
        let newStartDate = today;
        const newEndDate = new Date();
        newStartDate.setDate(today.getDate() - 7);
        this.updateSelectedDates(newStartDate, newEndDate, 'Last 7 days');
    }
    interpretSelection(button) {
        const selection = Number(button.dataset.option);
        const spanElement = button.querySelector('span');
        if (!spanElement)
            return;
        const label = spanElement.innerHTML;
        const today = new Date();
        const decrementingYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
        let newStartDate = today;
        let newEndDate = today;
        switch (selection) {
            case EQuickDates.Last7Days: {
                newStartDate.setDate(today.getDate() - 7);
                newEndDate = new Date();
                break;
            }
            case EQuickDates.Last14Days: {
                newStartDate.setDate(today.getDate() - 14);
                newEndDate = new Date();
                break;
            }
            case EQuickDates.ThisMonth: {
                newStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
                newEndDate = new Date(today.getFullYear(), today.getMonth(), getLastDayOfMonth(today));
                break;
            }
            case EQuickDates.LastMonth: {
                newStartDate = new Date(decrementingYear, today.getMonth() - 1, 1);
                newEndDate = new Date(decrementingYear, today.getMonth() - 1, getLastDayOfMonth(newStartDate));
                break;
            }
            case EQuickDates.ThisYear: {
                let lastMonthOfYear = new Date(today.getFullYear(), 11, 1);
                newStartDate = new Date(today.getFullYear(), 0, 1);
                newEndDate = new Date(today.getFullYear(), 11, getLastDayOfMonth(lastMonthOfYear));
                break;
            }
            case EQuickDates.LastYear: {
                let lastMonthOfYear = new Date(today.getFullYear() - 1, 11, 1);
                newStartDate = new Date(today.getFullYear() - 1, 0, 1);
                newEndDate = new Date(today.getFullYear() - 1, 11, getLastDayOfMonth(lastMonthOfYear));
                break;
            }
            default: {
                this.labelElement.innerHTML = label;
                this.dropdown.close();
                return;
            }
        }
        this.updateSelectedDates(newStartDate, newEndDate, label);
        this.dropdown.close();
    }
    updateSelectedDates(startDateRange, endDateRange, label) {
        this.buttonElement.dataset.startDate = startDateRange.getDate().toString();
        this.buttonElement.dataset.startMonth = startDateRange.getMonth().toString();
        this.buttonElement.dataset.startYear = startDateRange.getFullYear().toString();
        this.buttonElement.dataset.endDate = endDateRange.getDate().toString();
        this.buttonElement.dataset.endMonth = endDateRange.getMonth().toString();
        this.buttonElement.dataset.endYear = endDateRange.getFullYear().toString();
        this.labelElement.innerHTML = label;
    }
}
//# sourceMappingURL=Button.js.map