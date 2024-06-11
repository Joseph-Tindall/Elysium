document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckboxes = document.querySelectorAll('.toggleCheckbox');
    toggleCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', toggleFullListSelection);
    });
});

function toggleFullListSelection(event: Event): void {
    const target = event.target as HTMLElement;
    const table = target.closest('table');
    if (!table) return;
    
    const checkboxes = table.querySelectorAll('input[type="checkbox"]');

    let allChecked = true;
    checkboxes.forEach((checkbox) => {
        if (checkbox === target) return;
        if (!(checkbox instanceof HTMLInputElement)) return;
        if (!checkbox.checked) allChecked = false;
    });
    
    checkboxes.forEach((checkbox) => {
        if (!(checkbox instanceof HTMLInputElement)) return;
        checkbox.checked =!allChecked;
    });
}