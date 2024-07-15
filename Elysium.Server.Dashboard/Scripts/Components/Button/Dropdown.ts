export class Dropdown
{
    public element: HTMLElement;
    
    constructor(parent: HTMLElement) {
        if (!parent) return;
        this.element = this.createHtmlElement();
        parent.classList.add('expanded');
        parent.insertAdjacentElement('afterend', this.element);
        this.setPositionRelativeToParent(parent);
        
        return this;
    }
    
    private createHtmlElement(): HTMLElement {
        const dropdown: HTMLElement = document.createElement('dropdown');
        dropdown.classList.add('dropdown');
        return dropdown;
    }

    private setPositionRelativeToParent(parent: HTMLElement): void {
        const parentRect: DOMRect = parent.getBoundingClientRect();
        this.element.style.position = 'absolute';
        this.element.style.left = `${parentRect.left}px`;
        this.element.style.top = `${parentRect.bottom}px`;
    }
    
    public addOption(label: string, method: () => void): void {
        const option: HTMLOptionElement = document.createElement('option');
        option.innerHTML = '<span>' + label + '</span>';
        option.onclick = method;
        this.element.appendChild(option);
    }
}