export class Control {
    constructor(element, enabled = true) {
        this.element = element;
        this._enabled = enabled;
        return this;
    }
    setState(state) {
        this._enabled = state;
        this.updateState();
    }
    setMethod(method) {
        this._method = method;
        this.updateState();
    }
    updateState() {
        if (this._enabled) {
            this.element.disabled = false;
            this.element.classList.remove('disabled');
            this.element.onclick = this._method;
        }
        else {
            this.element.disabled = true;
            this.element.classList.add('disabled');
            this.element.onclick = void {};
        }
    }
}
//# sourceMappingURL=Control.js.map