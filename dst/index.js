import { createElement, body } from "./DOM.js";
import Loop from "./GameLoop.js";
import { ScreenView } from "./Screen.js";
const createDeafultScreen = () => {
    const s = new ScreenView();
    return s;
};
const buildPotatoFarm = (screen) => {
    const clickListener = createElement({ tag: "div" }, "windowCover");
    screen.mountChild(createElement({ tag: "div" }, "title"), {
        name: "title",
        onUpdate: (child) => {
            child.innerText = screen.getParam("title");
        },
    });
    screen.mountChild(clickListener, {
        name: "clickListener",
    });
    screen.mountChild(createElement({ style: { left: "0px", transform: "unset", animationDuration: "0s" } }, "title"), {
        name: "counter",
        onUpdate: (child) => (child.innerText = screen.getParam("clickCount")),
    });
    screen.setParam("title", "Kartoffelfarm");
    screen.setParam("clickCount", 0);
    clickListener.addEventListener("click", () => {
        const count = screen.getParam("clickCount");
        screen.setParam("clickCount", typeof count === "number" ? count + 1 : 1);
    });
    screen.update();
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
const farm = createScreen();
farm.appendTo(body);
Loop.registerScreen(farm, "farm");
Loop.start();
