import { Module } from "../Module/Factory.js";

export class Label
{
    public element: HTMLElement;
    protected label: HTMLElement;
    
    constructor(parent: HTMLElement = document.body, initialString?: string) {
        this.element = this.createHtmlElement(parent);
        if (initialString) this.setLabel(initialString);
        return this;
    }

    private createHtmlElement(parent: HTMLElement): HTMLElement {
        const module: Module = new Module();
        this.label = document.createElement('label');
        this.label.classList.add('label');
        module.element.appendChild(this.label);
        parent.appendChild(module.element);
        return module.element;
    }
    
    public setLabel(newLabel: string): void {
        this.label.innerHTML = '<span>' + newLabel + '</span>';
    }
}