import { EInteractions } from "../../Enumerations/EInteractions.js";
import { Day } from "./Day.js";
import { getLastDayOfMonth, getFirstDayOfWeek } from "./Utilities.js";
export class Calendar {
    constructor(initialDate, interactions = EInteractions.None, allowRange = false, type) {
        this.allDaysCache = [];
        this.selectedDays = [];
        this.cycle = 0;
        this.element = this.createHtmlElement(type);
        this.allowRange = allowRange;
        this.interactions = interactions;
        this.element.dataset.month = initialDate.getMonth().toString();
        this.element.dataset.year = initialDate.getFullYear().toString();
        this.update();
        return this;
    }
    createHtmlElement(type) {
        const element = document.createElement('calendar');
        if (type)
            element.classList.add(type);
        return element;
    }
    update() {
        if (this.element.querySelector('day'))
            this.removeDays();
        this.populateDays();
    }
    populateDays() {
        const date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month));
        const today = new Date().toLocaleDateString();
        for (let day = 1; day <= getLastDayOfMonth(date); day++) {
            const dayDate = new Date(date.getFullYear(), date.getMonth(), day).toLocaleDateString();
            const dayElement = document.createElement('day');
            const dayElementButton = document.createElement('button');
            if (this.interactions === EInteractions.Enabled) {
                dayElementButton.className = 'clickable';
                dayElementButton.addEventListener('click', (event) => this.onDayClick(event));
            }
            dayElementButton.innerHTML = '<span aria-hidden="true">' + day.toString() + '</span>';
            dayElement.appendChild(dayElementButton);
            if (dayDate === today)
                dayElement.classList.add('today');
            this.element.appendChild(dayElement);
            this.allDaysCache.push(dayElement);
        }
        const firstDayOfMonth = this.element.querySelector('day');
        if (firstDayOfMonth)
            firstDayOfMonth.style.gridColumnStart = getFirstDayOfWeek(date).toString();
    }
    removeDays() {
        const dayElements = this.element.querySelectorAll('day');
        dayElements.forEach((dayElement) => dayElement.remove());
        this.allDaysCache = [];
    }
    onDayClick(event) {
        const dayButton = event.currentTarget;
        const dayElement = dayButton.closest('day');
        const dayDate = Number(dayButton.querySelector('span').innerHTML);
        if (this.allowRange)
            this.cycle = this.cycle === 0 ? 1 : 0;
        else
            this.cycle = 0;
        if ((this.selectedDays[0] && this.selectedDays[1]) || (!this.allowRange && this.selectedDays[0])) {
            this.selectedDays[this.cycle].element.classList.remove('selected');
        }
        const date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month), dayDate);
        this.selectedDays[this.cycle] = new Day(dayElement, date);
        if ((this.selectedDays[0] && this.selectedDays[1]) && this.selectedDays[0].date < this.selectedDays[1].date) {
            [this.selectedDays[0], this.selectedDays[1]] = [this.selectedDays[1], this.selectedDays[0]];
        }
        dayElement.classList.add('selected');
        if (this.selectedDays[0] && this.selectedDays[1])
            this.highlightDayRange();
    }
    highlightDayRange() {
        this.allDaysCache.forEach((day) => {
            const dayButton = day.querySelector('button');
            const dayDate = Number(dayButton.querySelector('span').innerHTML);
            const date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month), dayDate);
            if (date > this.selectedDays[0].date && date < this.selectedDays[1].date) {
                day.classList.add('in-selection');
            }
            else {
                day.classList.remove('in-selection');
            }
        });
    }
}
//# sourceMappingURL=Factory.js.map