export class Calendar
{
    public element: HTMLElement;
    
    constructor() {
        this.element = this.generateHtmlElement();
        return this;
    }
    
    private generateHtmlElement(): HTMLElement {
        return new HTMLElement();
    }
}