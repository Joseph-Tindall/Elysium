import { Module } from "../Module/Factory.js";
import { Calendar } from "../Calendar/Factory.js";
import { EInteractions } from "../../Enumerations/EInteractions.js";
import { shortMonths } from "../Calendar/Constants.js";
import { LabelSideControls } from "../Label/LabelSideControls.js";

export class DatePicker
{
    private maximumDate: Date;
    private minimumDate: Date | null;
    private readonly calendar: Calendar;
    private readonly label: LabelSideControls;
    
    constructor(initialDate: Date = new Date(), maximumDate: Date = new Date(), minimumDate?: Date) {
        this.maximumDate = maximumDate;
        if (minimumDate) this.minimumDate = minimumDate;
        
        this.calendar = new Calendar(
            initialDate,
            EInteractions.Enabled,
            true,
            false,
            'date-picker'
        );

        const module: Module = new Module();
        this.label = new LabelSideControls(module.element);
        this.label.leftControl.setMethod(this.handlePreviousMonth);
        this.label.rightControl.setMethod(this.handleNextMonth);
        this.updateLabel();
        
        module.element.appendChild(this.label.element);
        module.element.appendChild(this.calendar.element);
        
        return this;
    }
    
    public setMaximumDate(date: Date): void {
        this.maximumDate = date;
        this.updateLabel();
    }

    public setMinimumDate(date: Date): void {
        this.minimumDate = date;
        this.updateLabel();
    }
    
    private handlePreviousMonth = (): void => {
        if (this.minimumDate) {
            const currentMonth: number = Number(this.calendar.element.dataset.month);
            const currentYear: number = Number(this.calendar.element.dataset.year);
            
            if (currentMonth <= this.minimumDate.getMonth() && currentYear <= this.minimumDate.getFullYear()) {
                return;
            }
        }
        
        this.calendar.scrollToPreviousMonth();
        this.updateLabel();
    }
    
    private handleNextMonth = (): void => {
        if (this.maximumDate) {
            const currentMonth: number = Number(this.calendar.element.dataset.month);
            const currentYear: number = Number(this.calendar.element.dataset.year);

            if (currentMonth >= this.maximumDate.getMonth() && currentYear >= this.maximumDate.getFullYear()) {
                return;
            }
        }

        this.calendar.scrollToNextMonth();
        this.updateLabel();
    }
    
    private updateLabel(): void {
        const month: number = Number(this.calendar.element.dataset.month);
        const year: number = Number(this.calendar.element.dataset.year);
        this.label.setLabel(shortMonths[month] + ' ' + year.toString());
        
        this.label.leftControl.setState(!(this.minimumDate && month === this.minimumDate.getMonth() && year === this.minimumDate.getFullYear()) || !this.minimumDate);
        this.label.rightControl.setState(!(this.maximumDate && month === this.maximumDate.getMonth() && year === this.maximumDate.getFullYear()) || !this.maximumDate);
    }
}