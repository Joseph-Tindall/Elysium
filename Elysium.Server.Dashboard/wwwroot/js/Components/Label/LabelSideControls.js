import { Label } from "./Factory.js";
import { Control } from "./Control.js";
export class LabelSideControls extends Label {
    constructor(parent, initialString) {
        super(parent, initialString);
        this.label.classList.add('side-controls');
        this.createControls();
        return this;
    }
    createControls() {
        this.leftControl = new Control(this.createControl('<'));
        this.rightControl = new Control(this.createControl('>'));
        this.element.insertBefore(this.leftControl.element, this.element.firstChild);
        this.element.appendChild(this.rightControl.element);
    }
    createControl(label) {
        const control = document.createElement('button');
        control.innerHTML = '<span aria-hidden="true">' + label + '</span>';
        control.className = 'control';
        return control;
    }
}
//# sourceMappingURL=LabelSideControls.js.map