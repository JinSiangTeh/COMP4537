import { USER_MESSAGES } from "../lang/messages/en/user.js";
import { MemoryButton } from "./MemoryButton.js";

export class GameEngine {
    constructor(ui) {
        this.ui = ui;
        this.buttons = [];
        this.expectedClick = 1;
        this.count = 0;
        this.usedHues = new Set();
    }

    startGame(n) {
        this.count = n;
        this.expectedClick = 1;
        this.buttons = [];
        this.usedHues.clear();

        this.ui.clearButtons();
        this.createButtons();
        this.scrambleButtons();
    }

    generateUniqueColor() {
        let hue;
        do {
            hue = Math.floor(Math.random() * 360);
        } while (this.usedHues.has(hue));

        this.usedHues.add(hue);
        return `hsl(${hue}, 70%, 60%)`;
    }

    createButtons() {
        const startX = 20;
        const startY = 120;

        for (let i = 1; i <= this.count; i++) {
            const color = this.generateUniqueColor();
            const btn = new MemoryButton(i, color);

            btn.setPosition(startX + (i - 1) * 170, startY);
            document.body.appendChild(btn.element);

            this.buttons.push(btn);
        }
    }

    scrambleButtons() {
        setTimeout(() => {
            let moves = 0;

            const interval = setInterval(() => {
                this.moveButtons();
                moves++;

                if (moves === this.count) {
                    clearInterval(interval);
                    this.buttons.forEach(btn => btn.hideNumber());
                    this.enableUserInput();
                }
            }, 2000);
        }, this.count * 1000);
    }

    moveButtons() {
        const maxX = window.innerWidth - 160;
        const maxY = window.innerHeight - 100;

        this.buttons.forEach(btn => {
            btn.setPosition(
                Math.random() * maxX,
                Math.random() * maxY
            );
        });
    }

    enableUserInput() {
        this.buttons.forEach(btn => {
            btn.enable(() => this.handleClick(btn));
        });
    }

    handleClick(btn) {
        if (btn.index === this.expectedClick) {
            btn.revealNumber();
            this.expectedClick++;

            if (this.expectedClick > this.buttons.length) {
                this.ui.showMessage(USER_MESSAGES.SUCCESS);
            }
        } else {
            this.buttons.forEach(b => b.revealNumber());
            this.ui.showMessage(USER_MESSAGES.FAILURE);
        }
    }
}
