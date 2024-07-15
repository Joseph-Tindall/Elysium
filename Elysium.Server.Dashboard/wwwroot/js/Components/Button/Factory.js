export class Button {
    constructor(prompt, method, tagName, icon) {
        this.element = document.createElement('button');
        this.element.innerHTML = '<span>' + prompt + '</span>';
        this.element.className = 'common';
        this.element.onclick = method;
        if (tagName)
            this.element.classList.add(tagName);
        return this;
    }
}
//# sourceMappingURL=Factory.js.map