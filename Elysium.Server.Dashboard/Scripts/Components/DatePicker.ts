import { Dropdown } from "./Button/Dropdown.js";
import { DatePicker } from "./DatePicker/Factory.js";

function Test(): void {
    alert('Test');
}

document.addEventListener('DOMContentLoaded', (): void => {
    const datePickers: NodeListOf<HTMLButtonElement> = document.querySelectorAll<HTMLButtonElement>('button.date-picker');
    
    datePickers.forEach((button: HTMLButtonElement): void => {
        button.onclick = (): void => {
            const test: Dropdown = new Dropdown(button);
            test.addOption('Last 7 days', Test);
            test.addOption('Last 14 days', Test);
            test.addOption('This month', Test);
            test.addOption('Last month', Test);
            test.addOption('This year', Test);
            test.addOption('Last year', Test);
            test.addOption('Custom date range', Test);
        };
    });
    
    //const datePicker: DatePicker = new DatePicker();
});