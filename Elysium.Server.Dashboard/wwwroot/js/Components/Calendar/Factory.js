import { EInteractions } from "../../Enumerations/EInteractions.js";
import { EDays } from "../../Enumerations/EDates.js";
import { Day } from "./Day.js";
import { getLastDayOfMonth, getFirstDayOfWeek } from "./Utilities.js";
import { shortDays } from "./Constants.js";
export class Calendar {
    constructor(initialDate, interactions = EInteractions.None, allowRange = false, expandableRange = false, tagName) {
        this.selectedDays = [];
        this.allDaysCache = [];
        this.cycle = 0;
        this.scrollToPreviousMonth = () => {
            const month = Number(this.element.dataset.month);
            const year = Number(this.element.dataset.year);
            const newMonth = month === 0 ? 11 : month - 1;
            const newYear = month === 0 ? year - 1 : year;
            this.element.dataset.year = newYear.toString();
            this.element.dataset.month = newMonth.toString();
            this.update();
        };
        this.scrollToNextMonth = () => {
            const month = Number(this.element.dataset.month);
            const year = Number(this.element.dataset.year);
            const newMonth = month === 11 ? 0 : month + 1;
            const newYear = month === 11 ? year + 1 : year;
            this.element.dataset.year = newYear.toString();
            this.element.dataset.month = newMonth.toString();
            this.update();
        };
        this.element = this.createHtmlElement(tagName);
        this.allowRange = allowRange;
        this.interactions = interactions;
        this.expandableRange = expandableRange;
        this.element.dataset.month = initialDate.getMonth().toString();
        this.element.dataset.year = initialDate.getFullYear().toString();
        this.update();
        return this;
    }
    createHtmlElement(type) {
        const element = document.createElement('calendar');
        if (type)
            element.classList.add(type);
        for (let dayOfWeek = EDays.Sunday; dayOfWeek <= EDays.Saturday; dayOfWeek++) {
            const day = document.createElement('div');
            day.className = 'day-of-week';
            day.innerHTML = shortDays[dayOfWeek];
            element.appendChild(day);
        }
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
            if (this.interactions != EInteractions.None) {
                const interactionClasses = ['enabled', 'disabled'];
                dayElementButton.className = interactionClasses[this.interactions - 1];
                dayElementButton.addEventListener('click', (event) => this.onDayClick(event));
            }
            dayElementButton.innerHTML = '<span aria-hidden="true">' + day.toString() + '</span>';
            dayElement.appendChild(dayElementButton);
            if (dayDate === today)
                dayElement.classList.add('today');
            this.selectedDays.forEach((selectedDay) => {
                const selectedDate = selectedDay.date.toLocaleDateString();
                if (dayDate === selectedDate) {
                    dayElement.classList.add('selected');
                }
            });
            this.element.appendChild(dayElement);
            this.allDaysCache.push(dayElement);
        }
        const firstDayOfMonth = this.element.querySelector('day');
        this.highlightDayRange();
        if (firstDayOfMonth)
            firstDayOfMonth.style.gridColumnStart = getFirstDayOfWeek(date).toString();
    }
    removeDays() {
        const dayElements = this.element.querySelectorAll('day');
        dayElements.forEach((dayElement) => dayElement.remove());
        this.allDaysCache = [];
    }
    sortDaysByDate() {
        if ((this.selectedDays[0] && this.selectedDays[1]) && this.selectedDays[0].date > this.selectedDays[1].date) {
            [this.selectedDays[0], this.selectedDays[1]] = [this.selectedDays[1], this.selectedDays[0]];
        }
    }
    updateCycle(override) {
        if (override != null) {
            if (this.selectedDays[override])
                this.selectedDays[override].element.classList.remove('selected');
            this.cycle = override;
        }
        else {
            this.cycle = this.allowRange && this.cycle === 0 ? 1 : 0;
        }
    }
    resetCycle() {
        for (let day = 0; day < this.selectedDays.length; day++) {
            if (!this.selectedDays[day])
                continue;
            this.selectedDays[day].element.classList.remove('selected');
            delete this.selectedDays[day];
        }
        this.cycle = 0;
    }
    onDayClick(event) {
        if (this.interactions != EInteractions.Enabled)
            return;
        const dayButton = event.currentTarget;
        const dayElement = dayButton.closest('day');
        const dayDate = Number(dayButton.querySelector('span').innerHTML);
        const date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month), dayDate);
        const bothDaysSameDate = !!(this.selectedDays[0] && this.selectedDays[1]) && ((this.selectedDays[0].date.getTime() === date.getTime()) ||
            (this.selectedDays[1].date.getTime() === date.getTime()));
        this.updateCycle();
        if (!this.allowRange && this.selectedDays[0]) {
            this.selectedDays[this.cycle].element.classList.remove('selected');
        }
        if ((!!(this.selectedDays[0] && this.selectedDays[1]) && (bothDaysSameDate || !this.expandableRange)) || !this.allowRange && this.selectedDays[0]) {
            this.resetCycle();
        }
        if (this.allowRange && !bothDaysSameDate && !!(this.selectedDays[0] && this.selectedDays[1]) && this.expandableRange) {
            const selectedTime = date.getTime();
            const leftTime = this.selectedDays[0].date.getTime();
            const rightTime = this.selectedDays[1].date.getTime();
            if (selectedTime < leftTime)
                this.updateCycle(0);
            else if (selectedTime > rightTime)
                this.updateCycle(1);
            else {
                const side = Math.abs(selectedTime - leftTime) <= Math.abs(selectedTime - rightTime) ? 0 : 1;
                this.updateCycle(side);
            }
        }
        this.selectedDays[this.cycle] = new Day(dayElement, date);
        this.sortDaysByDate();
        this.highlightDayRange();
        dayElement.classList.add('selected');
    }
    highlightDayRange() {
        if (!this.selectedDays)
            return;
        this.allDaysCache.forEach((day) => {
            var _a;
            const dayButton = day.querySelector('button');
            const dayDate = Number((_a = dayButton === null || dayButton === void 0 ? void 0 : dayButton.querySelector('span')) === null || _a === void 0 ? void 0 : _a.innerHTML);
            const date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month), dayDate);
            const dateLocalized = date.toLocaleDateString();
            if (!(this.selectedDays.some((selectedDay) => selectedDay.date.toLocaleDateString() === dateLocalized))) {
                day.classList.remove('selected');
            }
            if (this.selectedDays[0] && this.selectedDays[1] && date > this.selectedDays[0].date && date < this.selectedDays[1].date) {
                day.classList.add('in-selection');
            }
            else {
                day.classList.remove('in-selection');
            }
        });
    }
}
//# sourceMappingURL=Factory.js.map