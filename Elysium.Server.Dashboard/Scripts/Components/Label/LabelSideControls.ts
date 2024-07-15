import { Label } from "./Factory.js";
import { Control } from "./Control.js";

export class LabelSideControls extends Label
{
    public leftControl: Control;
    public rightControl: Control;
    
    constructor(parent: HTMLElement, initialString?: string) {
        super(parent, initialString);
        this.label.classList.add('side-controls');
        this.createControls();
        
        return this;
    }
    
    private createControls(): void {
        this.leftControl = new Control(this.createControl('<svg width="100%" height="100%" viewBox="0 0 417 417" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M240.144,381.946l-173.609,-173.613l173.609,-173.612l30.816,30.816l-142.795,142.796l142.795,142.796l-30.816,30.817Z" style="fill-rule:nonzero;"/></svg>'));
        this.rightControl = new Control(this.createControl('<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(1,0,0,1,0.16308,0)"><path d="M8.025,22L6.25,20.225L14.475,12L6.25,3.775L8.025,2L18.025,12L8.025,22Z" style="fill-rule:nonzero;"/></g></svg>'));

        this.element.insertBefore(this.leftControl.element, this.element.firstChild);
        this.element.appendChild(this.rightControl.element);
    }
    
    private createControl(label: string): HTMLButtonElement {
        const control: HTMLButtonElement = document.createElement('button');
        control.innerHTML = '<span aria-hidden="true">' + label + '</span>';
        control.className = 'control';
        return control;
    }
}