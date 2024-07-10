export class Module {
    constructor(parent = document.body) {
        this.element = this.createHtmlElement(parent);
        return this;
    }
    createHtmlElement(parent) {
        const element = document.createElement('module');
        element.classList.add('container');
        element.innerHTML = `<div class="content"><slot></slot></div>`;
        parent.appendChild(element);
        return element;
    }
}
//# sourceMappingURL=Factory.js.map