export class Module
{
    public element: HTMLElement;
    
    constructor(parent: HTMLElement = document.body) {
        this.element = this.createHtmlElement(parent);
        return this;
    }
    
    private createHtmlElement(parent: HTMLElement): HTMLElement {
        const element: HTMLElement = document.createElement('module');
        element.classList.add('container');
        parent.appendChild(element);
        return element;
    }
}