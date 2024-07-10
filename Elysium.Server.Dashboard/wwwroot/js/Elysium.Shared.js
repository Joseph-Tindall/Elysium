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
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.toggleCheckbox)');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateToggleCheckboxState);
    });
});
//# sourceMappingURL=Elysium.Shared.js.map