document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckboxes = document.querySelectorAll('.toggleCheckbox');
    toggleCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', toggleFullListSelection);
    });
});
function toggleFullListSelection(event) {
    const target = event.target;
    const table = target.closest('table');
    if (!table)
        return;
    const labelElement = target === null || target === void 0 ? void 0 : target.closest('label');
    labelElement.classList.remove('partial');
    const checkboxes = table.querySelectorAll('input[type="checkbox"]');
    let allChecked = true;
    checkboxes.forEach((checkbox) => {
        if (checkbox === target)
            return;
        if (!(checkbox instanceof HTMLInputElement))
            return;
        if (!checkbox.checked)
            allChecked = false;
    });
    checkboxes.forEach((checkbox) => {
        if (!(checkbox instanceof HTMLInputElement))
            return;
        checkbox.checked = !allChecked;
    });
}
function updateToggleCheckboxState(event) {
    const target = event.currentTarget;
    const table = target.closest('table');
    if (!table)
        return;
    const checkboxes = Array.from(table.querySelectorAll('input[type="checkbox"]:not(.toggleCheckbox)'));
    const totalCheckboxes = checkboxes.length;
    const checkedCount = checkboxes.filter((checkbox) => checkbox instanceof HTMLInputElement && checkbox.checked).length;
    const toggleCheckbox = table.querySelector('input.toggleCheckbox');
    const labelElement = toggleCheckbox === null || toggleCheckbox === void 0 ? void 0 : toggleCheckbox.closest('label');
    if (!toggleCheckbox)
        return;
    if (checkedCount === totalCheckboxes && totalCheckboxes > 0) {
        toggleCheckbox.checked = true;
        labelElement.classList.remove('partial');
    }
    else if (checkedCount > 0 && checkedCount < totalCheckboxes) {
        toggleCheckbox.checked = false;
        labelElement.classList.add('partial');
    }
    else {
        toggleCheckbox.checked = false;
        labelElement.classList.remove('partial');
    }
}
function populateCalendar(month, year) {
    const calendar = document.getElementById("calendar");
    if (!calendar)
        return;
    while (calendar.children.length > 7) {
        calendar.removeChild(calendar.lastChild);
    }
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "day";
        calendar.appendChild(emptyCell);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "day";
        dayCell.textContent = day.toString();
        if (day === currentDay && month === currentMonth && year === currentYear) {
            dayCell.classList.add("today");
        }
        calendar.appendChild(dayCell);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.toggleCheckbox)');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateToggleCheckboxState);
    });
    populateCalendar(6, 2024);
});
//# sourceMappingURL=Elysium.Shared.js.map