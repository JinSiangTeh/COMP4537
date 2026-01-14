

import { USER_MESSAGES } from "../lang/messages/en/user.js";
import { UserInterface } from "./UserInterface.js";
import { GameEngine } from "./GameEngine.js";

export class AppController {
    constructor() {
        this.ui = new UserInterface();
        this.engine = new GameEngine(this.ui);

        this.ui.goButton.onclick = () => this.handleStart();
    }

    handleStart() {
        const n = Number(this.ui.input.value);

        if (n < 3 || n > 7) {
            this.ui.showMessage(USER_MESSAGES.ERROR_RANGE);
            return;
        }

        this.engine.startGame(n);
    }
}
