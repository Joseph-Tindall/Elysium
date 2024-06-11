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