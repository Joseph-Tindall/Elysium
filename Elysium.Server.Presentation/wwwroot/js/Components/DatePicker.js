import { Module } from './Module/Factory.js';
function generateCalendar() {
    customElements.define('elysium-module', Module);
    const moduleInstance = document.createElement('elysium-module');
    document.body.appendChild(moduleInstance);
}
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
});
//# sourceMappingURL=DatePicker.js.map