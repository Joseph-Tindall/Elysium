document.addEventListener("DOMContentLoaded", (): void => {
    const toggleCheckboxes: NodeListOf<Element> = document.querySelectorAll('.toggleCheckbox');
    toggleCheckboxes.forEach((checkbox: Element) => {
        checkbox.addEventListener("change", toggleFullListSelection);
    });
});

function toggleFullListSelection(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    const table: HTMLTableElement = target.closest('table');
    if (!table) return;

    const labelElement: HTMLLabelElement | null = target?.closest('label')
    labelElement.classList.remove("partial");
    
    const checkboxes: NodeListOf<Element> = table.querySelectorAll('input[type="checkbox"]');

    let allChecked: boolean = true;
    checkboxes.forEach((checkbox: Element): void => {
        if (checkbox === target) return;
        if (!(checkbox instanceof HTMLInputElement)) return;
        if (!checkbox.checked) allChecked = false;
    });
    
    checkboxes.forEach((checkbox: Element): void => {
        if (!(checkbox instanceof HTMLInputElement)) return;
        checkbox.checked =!allChecked;
    });
}

function updateToggleCheckboxState(event: Event): void {
    const target: HTMLInputElement = event.currentTarget as HTMLInputElement;
    const table: HTMLTableElement = target.closest('table');
    if (!table) return;

    const checkboxes: Element[] = Array.from(
        table.querySelectorAll('input[type="checkbox"]:not(.toggleCheckbox)')
    );
    
    const totalCheckboxes: number = checkboxes.length;
    const checkedCount: number = checkboxes.filter(
        (checkbox): checkbox is HTMLInputElement =>
            checkbox instanceof HTMLInputElement && checkbox.checked
    ).length;

    const toggleCheckbox: HTMLInputElement = table.querySelector('input.toggleCheckbox') as HTMLInputElement | null;
    const labelElement: HTMLLabelElement | null = toggleCheckbox?.closest('label')
    if (!toggleCheckbox) return;

    if (checkedCount === totalCheckboxes && totalCheckboxes > 0) {
        toggleCheckbox.checked = true;
        labelElement.classList.remove("partial");
    } else if (checkedCount > 0 && checkedCount < totalCheckboxes) {
        toggleCheckbox.checked = false;
        labelElement.classList.add("partial");
    } else {
        toggleCheckbox.checked = false;
        labelElement.classList.remove("partial");
    }
}

interface DayInfo {
    element: HTMLElement;
    date: Date;
}

let startDateRange: { day: number, month: number, year: number } | null = null;
let endDateRange: { day: number, month: number, year: number } | null = null;
const dayCache: DayInfo[] = [];

function clearRange(): void {
    dayCache.forEach((dayInfo: DayInfo): void => {
        dayInfo.element.classList.remove("active", "range");
    });
}

function populateCalendar(calendar: HTMLElement, month: number, year: number): void {
    const childElement: HTMLElement | null = calendar.querySelector(".days");
    if (!childElement) return;
    
    while (childElement.children.length > 7) {
        childElement.removeChild(childElement.lastChild!);
    }

    const today: Date = new Date();
    const currentDay: number = today.getDate();
    const currentMonth: number = today.getMonth();
    const currentYear: number = today.getFullYear();

    const firstDayOfMonth: Date = new Date(year, month, 1);
    const lastDayOfMonth: Date = new Date(year, month + 1, 0);
    const daysInMonth: number = lastDayOfMonth.getDate();

    const startDay: number = firstDayOfMonth.getDay();

    for (let i: number = 0; i < startDay; i++) {
        const emptyCell:HTMLDivElement = document.createElement("div");
        childElement.appendChild(emptyCell);
    }

    for (let day: number = 1; day <= daysInMonth; day++) {
        const dayCell: HTMLDivElement = document.createElement("div");
        dayCell.className = "calendar-module-day";
        dayCell.textContent = day.toString();
        dayCell.dataset.day = day.toString();
        dayCell.dataset.month = month.toString();
        dayCell.dataset.year = year.toString();
        dayCell.addEventListener("click", onDayClick);

        if (day === currentDay && month === currentMonth && year === currentYear) {
            dayCell.classList.add("today");
        }

        const dayDate: Date = new Date(year, month, day);
        dayCache.push({ element: dayCell, date: dayDate });
        
        childElement.appendChild(dayCell);
    }
}

function onDayClick(event: MouseEvent): void {
    const target: HTMLElement = event.currentTarget as HTMLElement;
    const day: number = parseInt(target.dataset.day!);
    const month: number = parseInt(target.dataset.month!);
    const year: number = parseInt(target.dataset.year!);

    if (!startDateRange || endDateRange) {
        clearRange();
        startDateRange = { day, month, year };
        endDateRange = null;
        target.classList.add("active");
    } else {
        endDateRange = { day, month, year };

        if (new Date(year, month, day) < new Date(startDateRange.year, startDateRange.month, startDateRange.day)) {
            endDateRange = startDateRange;
            startDateRange = { day, month, year };
        }

        target.classList.add("active");
        markRange();
    }
}

function markRange(): void {
    if (!startDateRange || !endDateRange) return;

    const startDate: Date = new Date(startDateRange.year, startDateRange.month, startDateRange.day);
    const endDate: Date = new Date(endDateRange.year, endDateRange.month, endDateRange.day);

    dayCache.forEach((dayInfo: DayInfo): void => {
        const currentDate: Date = dayInfo.date;
        if (currentDate >= startDate && currentDate <= endDate && !dayInfo.element.classList.contains("active")) {
            dayInfo.element.classList.add("range");
        }
    });
}

document.addEventListener("DOMContentLoaded", (): void => {
    const checkboxes: NodeListOf<Element> = document.querySelectorAll('input[type="checkbox"]:not(.toggleCheckbox)');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateToggleCheckboxState);
    });

    const calendarTest1 = document.getElementById("calendar1");
    const calendarTest2 = document.getElementById("calendar2");
    populateCalendar(calendarTest1, 4, 2024);
    populateCalendar(calendarTest2, 6, 2024);
});