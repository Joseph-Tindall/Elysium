export class Dropdown {
    constructor(parent) {
        if (!parent)
            return;
        this.element = this.createHtmlElement();
        parent.classList.add('expanded');
        parent.insertAdjacentElement('afterend', this.element);
        this.setPositionRelativeToParent(parent);
        return this;
    }
    createHtmlElement() {
        const dropdown = document.createElement('dropdown');
        dropdown.classList.add('dropdown');
        return dropdown;
    }
    setPositionRelativeToParent(parent) {
        const parentRect = parent.getBoundingClientRect();
        this.element.style.position = 'absolute';
        this.element.style.left = `${parentRect.left}px`;
        this.element.style.top = `${parentRect.bottom}px`;
    }
    addOption(label, method) {
        const option = document.createElement('option');
        option.innerHTML = '<span>' + label + '</span>';
        option.onclick = method;
        this.element.appendChild(option);
    }
}
//# sourceMappingURL=Dropdown.js.map