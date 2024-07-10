export class Day {
    element: HTMLElement;
    date: Date;
    
    constructor(element: HTMLElement, date: Date) {
        this.element = element;
        this.date = date;
        return this;
    }
}