export class Calendar
{
    public element: HTMLElement;
    
    constructor(initialDate: Date, type?: string) {
        this.element = this.createHtmlElement(type);
        this.populateDays(initialDate);
        return this;
    }
    
    private createHtmlElement(type?: string): HTMLElement {
        const element: HTMLElement = document.createElement('calendar');
        if (type) element.classList.add(type);
        return element;
    }
    
    private getLastDayOfMonth(date: Date): number {
        let nextMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        return nextMonth.getDate();
    }

    private getFirstDayOfWeekIndex(date: Date): number {
        const firstDay: Date = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfWeek: number = firstDay.getDay();
        return dayOfWeek === 0 ? 1 : dayOfWeek + 1;
    }
    
    public populateDays(date: Date): void {
        for (let i: number = 1; i <= this.getLastDayOfMonth(date); i++) {
            const day: HTMLElement = document.createElement('day');
            day.innerHTML = i.toString();
            this.element.appendChild(day);
        }
        
        
    }
}