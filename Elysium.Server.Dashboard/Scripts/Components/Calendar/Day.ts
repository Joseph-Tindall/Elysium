export class Day {
    element: HTMLElement;
    date: Date;
    day: number;
    month: number;
    year: number;
    
    constructor(element: HTMLElement, date: Date) {
        this.element = element;
        this.date = date;
        
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        
        return this;
    }
}