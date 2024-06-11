document.addEventListener('DOMContentLoaded', function () {
    var toggleCheckboxes = document.querySelectorAll('.toggleCheckbox');
    toggleCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', toggleFullListSelection);
    });
});
function toggleFullListSelection(event) {
    var target = event.target;
    var table = target.closest('table');
    if (!table)
        return;
    var checkboxes = table.querySelectorAll('input[type="checkbox"]');
    var allChecked = true;
    checkboxes.forEach(function (checkbox) {
        if (checkbox === target)
            return;
        if (!(checkbox instanceof HTMLInputElement))
            return;
        if (!checkbox.checked)
            allChecked = false;
    });
    checkboxes.forEach(function (checkbox) {
        if (!(checkbox instanceof HTMLInputElement))
            return;
        checkbox.checked = !allChecked;
    });
}
//# sourceMappingURL=Elysium.Shared.js.map