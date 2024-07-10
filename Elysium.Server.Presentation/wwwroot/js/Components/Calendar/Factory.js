export class Calendar {
    constructor(initialDate, type) {
        this.element = this.createHtmlElement(type);
        this.populateDays(initialDate);
        return this;
    }
    createHtmlElement(type) {
        const element = document.createElement('calendar');
        if (type)
            element.classList.add(type);
        return element;
    }
    getLastDayOfMonth(date) {
        let nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        return nextMonth.getDate();
    }
    populateDays(date) {
        for (let i = 1; i <= this.getLastDayOfMonth(date); i++) {
            const day = document.createElement('day');
            day.innerHTML = i.toString();
            this.element.appendChild(day);
        }
    }
}
//# sourceMappingURL=Factory.js.map