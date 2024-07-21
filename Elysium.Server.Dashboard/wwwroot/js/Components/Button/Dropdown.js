export class Dropdown {
    constructor(parent) {
        this.handleOutsideClick = (event) => {
            if (!this.element.contains(event.target)) {
                this.close();
            }
        };
        if (!parent)
            return;
        this.button = parent;
        this.element = this.createHtmlElement();
        this.button.classList.add('expanded');
        this.button.insertAdjacentElement('afterend', this.element);
        this.setPositionRelativeToParent(this.button);
        this.addEventListeners();
        return this;
    }
    addEventListeners() {
        this.element.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        setTimeout(() => {
            document.addEventListener('click', this.handleOutsideClick);
        }, 0);
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
        option.dataset.option = this.element.children.length.toString();
        option.innerHTML = '<span>' + label + '</span>';
        setTimeout(() => {
            option.onclick = method;
        }, 0);
        this.element.appendChild(option);
    }
    close() {
        this.element.remove();
        this.button.classList.remove('expanded');
        document.removeEventListener('click', this.handleOutsideClick);
    }
}
//# sourceMappingURL=Dropdown.js.map