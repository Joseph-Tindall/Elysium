import { Module } from "../Module/Factory.js";

export class Label
{
    public element: HTMLElement;
    
    constructor(parent: HTMLElement = document.body) {
        this.element = this.createHtmlElement(parent);
        return this;
    }

    private createHtmlElement(parent: HTMLElement): HTMLElement {
        const module: Module = new Module();
        const element: HTMLElement = document.createElement('label');
        element.classList.add('label');
        parent.appendChild(element);
        return element;
    }
}