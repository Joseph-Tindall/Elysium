export class Group {
    constructor(tagName) {
        this.element = document.createElement('div');
        this.element.className = 'group';
        if (tagName)
            this.element.classList.add(tagName);
        return this;
    }
    addSpacer() {
        const spacer = document.createElement('div');
        spacer.className = 'spacer';
        this.element.appendChild(spacer);
    }
}
//# sourceMappingURL=Group.js.map