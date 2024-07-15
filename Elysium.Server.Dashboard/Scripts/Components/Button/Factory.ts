export class Button
{
    public element: HTMLButtonElement;
    
    constructor(prompt: string, method: () => void, tagName?: string, icon?: string) {
        this.element = document.createElement('button');
        this.element.innerHTML = '<span>' + prompt + '</span>';
        this.element.className = 'common';
        this.element.onclick = method;
        
        if (tagName) this.element.classList.add(tagName);
        return this;
    }
}