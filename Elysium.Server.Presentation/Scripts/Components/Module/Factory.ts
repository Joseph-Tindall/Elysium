export class Module extends HTMLElement
{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.generateHtmlElement());
        return this;
    }
    
    private generateHtmlElement(): HTMLElement {
        const element: HTMLElement = document.createElement('module');
        element.classList.add('container');
        element.innerHTML = `<div class="content"><slot></slot></div>`;
        return element;
    }

    connectedCallback(): void {
        // Additional initialization if needed
    }

    disconnectedCallback(): void {
        // Cleanup if needed
    }
}