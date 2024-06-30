document.addEventListener('DOMContentLoaded', (): void => {
    const toggleCheckboxes: NodeListOf<Element> = document.querySelectorAll('.toggleCheckbox');
    toggleCheckboxes.forEach((checkbox: Element) => {
        checkbox.addEventListener('change', toggleFullListSelection);
    });
});

function toggleFullListSelection(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    const table: HTMLTableElement = target.closest('table');
    if (!table) return;

    const labelElement: HTMLLabelElement | null = target?.closest('label')
    labelElement.classList.remove('partial');
    
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
        labelElement.classList.remove('partial');
    } else if (checkedCount > 0 && checkedCount < totalCheckboxes) {
        toggleCheckbox.checked = false;
        labelElement.classList.add('partial');
    } else {
        toggleCheckbox.checked = false;
        labelElement.classList.remove('partial');
    }
}

function populateCalendar(month: number, year: number): void {
    const calendar: HTMLElement = document.getElementById("calendar");
    if (!calendar) return;

    while (calendar.children.length > 7) {
        calendar.removeChild(calendar.lastChild!);
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
        emptyCell.className = "day";
        calendar.appendChild(emptyCell);
    }

    for (let day: number = 1; day <= daysInMonth; day++) {
        const dayCell: HTMLDivElement = document.createElement("div");
        dayCell.className = "day";
        dayCell.textContent = day.toString();

        if (day === currentDay && month === currentMonth && year === currentYear) {
            dayCell.classList.add("today");
        }

        calendar.appendChild(dayCell);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes: NodeListOf<Element> = document.querySelectorAll('input[type="checkbox"]:not(.toggleCheckbox)');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateToggleCheckboxState);
    });

    populateCalendar(6, 2024);
});