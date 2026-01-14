
export class MemoryButton {
    constructor(index, color) {
        this.index = index;
        this.color = color;

        this.element = document.createElement("button");
        this.element.classList.add("memory-btn");

        this.element.style.backgroundColor = color;
        this.element.style.width = "10em";
        this.element.style.height = "5em";
        this.element.style.position = "absolute";

        this.disable();
        this.revealNumber();
    }

    revealNumber() {
        this.element.textContent = this.index;
    }

    hideNumber() {
        this.element.textContent = "";
    }

    setPosition(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    disable() {
        this.element.disabled = true;
        this.element.onclick = null;
    }

    enable(handler) {
        this.element.disabled = false;
        this.element.onclick = handler;
    }
}
