export class Dropdown
{
    private readonly button: HTMLElement;
    public element: HTMLElement;
    
    constructor(parent: HTMLElement) {
        if (!parent) return;
        this.button = parent;
        
        this.element = this.createHtmlElement();
        this.button.classList.add('expanded');
        this.button.insertAdjacentElement('afterend', this.element);
        this.setPositionRelativeToParent(this.button);
        this.addEventListeners();
        
        return this;
    }
    
    private addEventListeners(): void {
        this.element.addEventListener('click', (event: MouseEvent): void => {
            event.stopPropagation();
        });

        setTimeout((): void => {
            document.addEventListener('click', this.handleOutsideClick);
        }, 0);
    }
    
    private handleOutsideClick = (event: MouseEvent): void => {
        if (!this.element.contains(event.target as Node)) {
            this.close();
        }
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
    
    public addOption(label: string, method: (event: Event) => void): void {
        const option: HTMLOptionElement = document.createElement('option');
        option.dataset.option = this.element.children.length.toString();
        option.innerHTML = '<span>' + label + '</span>';

        setTimeout((): void => {
            option.onclick = method;
        }, 0);
        
        this.element.appendChild(option);
    }
    
    public close(): void {
        this.element.remove();
        this.button.classList.remove('expanded');
        document.removeEventListener('click', this.handleOutsideClick);
    }
}