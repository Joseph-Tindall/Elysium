import { Module } from "../Module/Factory.js";
export class Label {
    constructor(parent = document.body, initialString) {
        this.element = this.createHtmlElement(parent);
        if (initialString)
            this.setLabel(initialString);
        return this;
    }
    createHtmlElement(parent) {
        const module = new Module();
        this.label = document.createElement('label');
        this.label.classList.add('label');
        module.element.appendChild(this.label);
        parent.appendChild(module.element);
        return module.element;
    }
    setLabel(newLabel) {
        this.label.innerHTML = '<span>' + newLabel + '</span>';
    }
}
//# sourceMappingURL=Factory.js.map