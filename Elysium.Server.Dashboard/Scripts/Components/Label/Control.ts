export class Control {
    element: HTMLButtonElement;
    enabled: boolean;
    method: () => void;

    constructor(element: HTMLButtonElement, enabled: boolean = true) {
        this.element = element;
        this.enabled = enabled;
        return this;
    }
    
    setState(state: boolean): void {
        this.enabled = state;
        this.updateState();
    }
    
    setMethod(method: () => void): void {
        this.method = method;
        this.updateState();
    }
    
    updateState(): void {
        if (this.enabled) {
            this.element.classList.remove('disabled');
            this.element.onclick = this.method;
        } else {
            this.element.classList.add('disabled');
            this.element.onclick = void {};
        }
    }
}