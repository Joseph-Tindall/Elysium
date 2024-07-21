import { DatePickerButton } from "./DatePicker/Button.js";

document.addEventListener('DOMContentLoaded', (): void => {
    const datePickers: NodeListOf<HTMLButtonElement> = document.querySelectorAll<HTMLButtonElement>('button.date-picker');
    
    datePickers.forEach((button: HTMLButtonElement): void => {
        new DatePickerButton(button);
    });
    
    //const datePicker: DatePicker = new DatePicker();
});