import { Module } from "../Module/Factory.js";
import { Button } from "../Button/Factory.js";
import { Calendar } from "../Calendar/Factory.js";
import { shortMonths } from "../Calendar/Constants.js";
import { EInteractions } from "../../Enumerations/EInteractions.js";
import { LabelSideControls } from "../Label/LabelSideControls.js";
import { Group } from "../../Elements/Group.js";

export class DatePicker
{
    private maximumDate: Date;
    private minimumDate: Date | null;
    private readonly container: Module;
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

        this.container = new Module();
        this.label = new LabelSideControls(this.container.element);
        this.label.leftControl.setMethod(this.handlePreviousMonth);
        this.label.rightControl.setMethod(this.handleNextMonth);
        this.updateLabel();

        this.container.element.appendChild(this.label.element);
        this.container.element.appendChild(this.calendar.element);
        
        const buttonGroup: Group = new Group();
        const clearButton: Button = new Button('Clear', this.clearSelection);
        const cancelButton: Button = new Button('Cancel', this.close);
        const applyButton: Button = new Button('Apply', this.applySelection, 'action');
        
        buttonGroup.element.appendChild(clearButton.element);
        buttonGroup.addSpacer();
        buttonGroup.element.appendChild(cancelButton.element);
        buttonGroup.element.appendChild(applyButton.element);
        this.container.element.appendChild(buttonGroup.element);
        
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
    
    private clearSelection = (): void => {
        this.calendar.resetCycle();
        this.calendar.highlightDayRange();
    }
    
    private close = (): void => {
        this.label.leftControl.setMethod(null);
        this.label.rightControl.setMethod(null);
        this.clearSelection = (): void => {};
        
        this.container.element.remove();

        (this.container as any) = null;
        (this.calendar as any) = null;
        (this.label as any) = null;
    }
    
    private applySelection = (): void => {
        this.close();
    }
}