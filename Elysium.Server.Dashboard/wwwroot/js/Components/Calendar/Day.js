export class Day {
    constructor(element, date) {
        this.element = element;
        this.date = date;
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        return this;
    }
}
//# sourceMappingURL=Day.js.map