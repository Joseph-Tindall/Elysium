export class Control {
    constructor(element, enabled = true) {
        this.element = element;
        this.enabled = enabled;
        return this;
    }
    setState(state) {
        this.enabled = state;
        this.updateState();
    }
    setMethod(method) {
        this.method = method;
        this.updateState();
    }
    updateState() {
        if (this.enabled) {
            this.element.classList.remove('disabled');
            this.element.onclick = this.method;
        }
        else {
            this.element.classList.add('disabled');
            this.element.onclick = void {};
        }
    }
}
//# sourceMappingURL=Control.js.map