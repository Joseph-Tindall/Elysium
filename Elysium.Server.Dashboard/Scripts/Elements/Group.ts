export class Group
{
    public element: HTMLDivElement;
    
    constructor(tagName?: string) {
        this.element = document.createElement('div');
        this.element.className = 'group';
        if (tagName) this.element.classList.add(tagName);
        
        return this;
    }
    
    public addSpacer(): void {
        const spacer: HTMLDivElement = document.createElement('div');
        spacer.className = 'spacer';
        this.element.appendChild(spacer);
    }
}