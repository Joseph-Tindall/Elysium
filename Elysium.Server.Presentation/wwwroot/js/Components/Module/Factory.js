export class Module extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.generateHtmlElement());
        return this;
    }
    generateHtmlElement() {
        const element = document.createElement('module');
        element.classList.add('container');
        element.innerHTML = `<div class="content"><slot></slot></div>`;
        return element;
    }
    connectedCallback() {
        // Additional initialization if needed
    }
    disconnectedCallback() {
        // Cleanup if needed
    }
}
//# sourceMappingURL=Factory.js.map