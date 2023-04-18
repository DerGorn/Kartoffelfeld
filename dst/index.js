import { createElement, body } from "./DOM.js";
import { ScreenView } from "./Screen.js";
const createDeafultScreen = () => {
    const s = new ScreenView();
    s.title = "t";
    const screen = createElement({ id: "screen" }, "screen");
    return screen;
};
const buildPotatoFarm = (screen) => {
    return screen;
};
const createScreen = (screen = "potatoFarm") => {
    switch (screen) {
        case "potatoFarm":
            return buildPotatoFarm(createDeafultScreen());
        default:
            throw new Error(`Fick dich. Der angegebene Screen exestiert nicht, du hast es dennoch geschafft ihn in die Funktion zu schummeln.\n\nSpecified screen = '${screen}'`);
    }
};
body.append(createScreen());
