import { Module } from './Module/Factory.js';

function generateCalendar(): void {
    customElements.define('elysium-module', Module);
    const moduleInstance: HTMLElement = document.createElement('elysium-module');
    document.body.appendChild(moduleInstance);
}

document.addEventListener('DOMContentLoaded', (): void => {
    generateCalendar();
});