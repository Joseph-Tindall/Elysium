﻿import { EInteractions } from "../../Enumerations/EInteractions.js";
import { Day } from "./Day.js";
import { getLastDayOfMonth, getFirstDayOfWeek } from "./Utilities.js";

export class Calendar
{
    public element: HTMLElement;
    public selectedDays: Day[] = [];
    
    private readonly allowRange: boolean;
    private readonly alternateSelections: boolean;
    private readonly interactions: EInteractions;
    
    private allDaysCache: HTMLElement[] = [];
    private cycle: number = 0;
    
    constructor(initialDate: Date, interactions: EInteractions = EInteractions.None, allowRange: boolean = false, alternateSelections: boolean = true, type?: string) {
        this.element = this.createHtmlElement(type);
        
        this.allowRange = allowRange;
        this.interactions = interactions;
        this.alternateSelections = alternateSelections;
        this.element.dataset.month = initialDate.getMonth().toString();
        this.element.dataset.year = initialDate.getFullYear().toString();
        this.update();
        
        return this;
    }
    
    private createHtmlElement(type?: string): HTMLElement {
        const element: HTMLElement = document.createElement('calendar');
        if (type) element.classList.add(type);
        
        return element;
    }
    
    public update(): void {
        if (this.element.querySelector<HTMLElement>('day')) this.removeDays();
        this.populateDays();
    }
    
    private populateDays(): void {
        const date: Date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month));
        const today: string = new Date().toLocaleDateString();
        
        for (let day: number = 1; day <= getLastDayOfMonth(date); day++) {
            const dayDate: string = new Date(date.getFullYear(), date.getMonth(), day).toLocaleDateString();
            const dayElement: HTMLElement = document.createElement('day');
            
            const dayElementButton: HTMLButtonElement = document.createElement('button');
            
            if (this.interactions === EInteractions.Enabled) {
                dayElementButton.className = 'clickable';
                dayElementButton.addEventListener('click', (event: MouseEvent) => this.onDayClick(event));
            }
            
            dayElementButton.innerHTML = '<span aria-hidden="true">' + day.toString() + '</span>';
            dayElement.appendChild(dayElementButton);
            
            if (dayDate === today) dayElement.classList.add('today');
            
            this.element.appendChild(dayElement);
            this.allDaysCache.push(dayElement);
        }

        const firstDayOfMonth: HTMLElement = this.element.querySelector<HTMLElement>('day');
        
        if (firstDayOfMonth) firstDayOfMonth.style.gridColumnStart = getFirstDayOfWeek(date).toString();
    }

    private removeDays(): void {
        const dayElements: NodeListOf<HTMLElement> = this.element.querySelectorAll('day');
        dayElements.forEach((dayElement: HTMLElement) => dayElement.remove());
        this.allDaysCache = [] as HTMLElement[];
    }
    
    private updateCycle(): void {
        this.cycle = this.allowRange && this.cycle === 0 ? 1 : 0;
    }
    
    private onDayClick(event: MouseEvent): void {
        const dayButton: HTMLButtonElement = event.currentTarget as HTMLButtonElement;
        const dayElement: HTMLElement = dayButton.closest('day');
        const dayDate: number = Number(dayButton.querySelector<HTMLElement>('span').innerHTML);

        this.updateCycle();
        
        if ((this.selectedDays[0] && this.selectedDays[1]) || (!this.allowRange && this.selectedDays[0])) {
            if (this.selectedDays[1] && this.selectedDays[0].date.getTime() === this.selectedDays[1].date.getTime()) {
                this.selectedDays[0] = this.selectedDays[this.cycle];
                this.cycle = 1;
            } else {
                this.selectedDays[this.cycle].element.classList.remove('selected');
            }
        }

        if (!this.alternateSelections && this.selectedDays[0] && this.selectedDays[1]) {
            for (let day: number = 0; day < 2; day++) {
                this.selectedDays[day].element.classList.remove('selected');
                delete this.selectedDays[day];
            }
            
            this.cycle = 0;
        }

        const date: Date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month), dayDate);
        this.selectedDays[this.cycle] = new Day(dayElement, date);
        
        if ((this.selectedDays[0] && this.selectedDays[1]) && this.selectedDays[0].date > this.selectedDays[1].date) {
            [this.selectedDays[0], this.selectedDays[1]] = [this.selectedDays[1], this.selectedDays[0]];
            this.updateCycle();
        }
        
        dayElement.classList.add('selected');
        this.highlightDayRange();
    }
    
    private highlightDayRange(): void {
        this.allDaysCache.forEach((day: HTMLElement): void => {
            const dayButton: HTMLButtonElement = day.querySelector<HTMLButtonElement>('button');
            const dayDate: number = Number(dayButton?.querySelector<HTMLElement>('span')?.innerHTML);
            const date: Date = new Date(Number(this.element.dataset.year), Number(this.element.dataset.month), dayDate);
            
            if (this.selectedDays[0] && this.selectedDays[1] && date > this.selectedDays[0].date && date < this.selectedDays[1].date) {
                 day.classList.add('in-selection');
            } else {
                day.classList.remove('in-selection');
            }
        });
    }
}