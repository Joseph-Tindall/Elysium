document.addEventListener("DOMContentLoaded", () => {
    const toggleCheckboxes = document.querySelectorAll('.toggleCheckbox');
    toggleCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", toggleFullListSelection);
    });
});
function toggleFullListSelection(event) {
    const target = event.target;
    const table = target.closest('table');
    if (!table)
        return;
    const labelElement = target === null || target === void 0 ? void 0 : target.closest('label');
    labelElement.classList.remove("partial");
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
        labelElement.classList.remove("partial");
    }
    else if (checkedCount > 0 && checkedCount < totalCheckboxes) {
        toggleCheckbox.checked = false;
        labelElement.classList.add("partial");
    }
    else {
        toggleCheckbox.checked = false;
        labelElement.classList.remove("partial");
    }
}
let startDateRange = null;
let endDateRange = null;
const dayCache = [];
function clearRange() {
    dayCache.forEach((dayInfo) => {
        dayInfo.element.classList.remove("active", "range");
    });
}
function populateCalendar(calendar, month, year) {
    const childElement = calendar.querySelector(".days");
    if (!childElement)
        return;
    while (childElement.children.length > 7) {
        childElement.removeChild(childElement.lastChild);
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
        childElement.appendChild(emptyCell);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "calendar-module-day";
        dayCell.textContent = day.toString();
        dayCell.dataset.day = day.toString();
        dayCell.dataset.month = month.toString();
        dayCell.dataset.year = year.toString();
        dayCell.addEventListener("click", onDayClick);
        if (day === currentDay && month === currentMonth && year === currentYear) {
            dayCell.classList.add("today");
        }
        const dayDate = new Date(year, month, day);
        dayCache.push({ element: dayCell, date: dayDate });
        childElement.appendChild(dayCell);
    }
}
function onDayClick(event) {
    const target = event.currentTarget;
    const day = parseInt(target.dataset.day);
    const month = parseInt(target.dataset.month);
    const year = parseInt(target.dataset.year);
    if (!startDateRange || endDateRange) {
        clearRange();
        startDateRange = { day, month, year };
        endDateRange = null;
        target.classList.add("active");
    }
    else {
        endDateRange = { day, month, year };
        if (new Date(year, month, day) < new Date(startDateRange.year, startDateRange.month, startDateRange.day)) {
            endDateRange = startDateRange;
            startDateRange = { day, month, year };
        }
        target.classList.add("active");
        markRange();
    }
}
function markRange() {
    if (!startDateRange || !endDateRange)
        return;
    const startDate = new Date(startDateRange.year, startDateRange.month, startDateRange.day);
    const endDate = new Date(endDateRange.year, endDateRange.month, endDateRange.day);
    dayCache.forEach((dayInfo) => {
        const currentDate = dayInfo.date;
        if (currentDate >= startDate && currentDate <= endDate && !dayInfo.element.classList.contains("active")) {
            dayInfo.element.classList.add("range");
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.toggleCheckbox)');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateToggleCheckboxState);
    });
    const calendarTest1 = document.getElementById("calendar1");
    const calendarTest2 = document.getElementById("calendar2");
    populateCalendar(calendarTest1, 4, 2024);
    populateCalendar(calendarTest2, 6, 2024);
});
//# sourceMappingURL=Elysium.Shared.js.map