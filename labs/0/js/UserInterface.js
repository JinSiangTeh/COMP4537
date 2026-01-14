import { USER_MESSAGES } from "../lang/messages/en/user.js";

export class UserInterface {
    constructor() {
        this.root = document.body;
        this.createControls();
    }

    createControls() {
        const row1 = document.createElement("div");
        const row2 = document.createElement("div");

        row1.style.marginBottom = "0.5em";

        this.label = document.createElement("label");
        this.label.textContent = USER_MESSAGES.LABEL_PROMPT;

        this.input = document.createElement("input");
        this.input.type = "number";

        this.goButton = document.createElement("button");
        this.goButton.textContent = USER_MESSAGES.BTN_GO;

        this.message = document.createElement("div");

        row1.appendChild(this.label);
        row2.append(this.input, this.goButton);

        this.root.append(row1, row2, this.message);
    }

    showMessage(text) {
        this.message.textContent = text;
    }

    clearButtons() {
        document.querySelectorAll(".memory-btn").forEach(btn => btn.remove());
        this.showMessage("");
    }
}
