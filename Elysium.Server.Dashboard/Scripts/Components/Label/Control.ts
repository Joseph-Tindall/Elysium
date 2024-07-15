export class Control {
    element: HTMLButtonElement;
    private _enabled: boolean;
    private _method: () => void;

    constructor(element: HTMLButtonElement, enabled: boolean = true) {
        this.element = element;
        this._enabled = enabled;
        return this;
    }
    
    setState(state: boolean): void {
        this._enabled = state;
        this.updateState();
    }
    
    setMethod(method: () => void): void {
        this._method = method;
        this.updateState();
    }
    
    updateState(): void {
        if (this._enabled) {
            this.element.disabled = false;
            this.element.classList.remove('disabled');
            this.element.onclick = this._method;
        } else {
            this.element.disabled = true;
            this.element.classList.add('disabled');
            this.element.onclick = void {};
        }
    }
}