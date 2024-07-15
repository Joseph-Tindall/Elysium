import { Dropdown } from "./Button/Dropdown.js";
function Test() {
    alert('Test');
}
document.addEventListener('DOMContentLoaded', () => {
    const datePickers = document.querySelectorAll('button.date-picker');
    datePickers.forEach((button) => {
        button.onclick = () => {
            const test = new Dropdown(button);
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
//# sourceMappingURL=DatePicker.js.map