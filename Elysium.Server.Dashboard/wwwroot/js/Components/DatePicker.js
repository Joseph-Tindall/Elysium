import { DatePickerButton } from "./DatePicker/Button.js";
document.addEventListener('DOMContentLoaded', () => {
    const datePickers = document.querySelectorAll('button.date-picker');
    datePickers.forEach((button) => {
        new DatePickerButton(button);
    });
    //const datePicker: DatePicker = new DatePicker();
});
//# sourceMappingURL=DatePicker.js.map