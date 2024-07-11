export class Label {
    constructor(parent = document.body) {
        this.element = this.createHtmlElement(parent);
        return this;
    }
    createHtmlElement(parent) {
        const element = document.createElement('label');
        element.classList.add('label');
        parent.appendChild(element);
        return element;
    }
}
//# sourceMappingURL=Factory.js.map