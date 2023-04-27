import Loop from "./GameLoop.js";
import { ProductionSiteResourceMap, p } from "./Resources.js";
import { ScreenView } from "./Screen.js";
import { createElement, body } from "./DOM.js";
import Clicker from "./Clicker.js";
import Shop from "./Shop.js";
const createArrow = (left = true) => {
    const clickArrow = () => {
        const sites = Object.keys(unlockedScreens);
        if (sites.length <= 1 || activeScreen == null)
            return false;
        const order = sites.sort((a, b) => p.indexOf(a) - p.indexOf(b));
        let i = order.indexOf(activeScreen);
        i += left ? -1 : 1;
        if (i < 0)
            i = order.length - 1;
        if (i > order.length - 1)
            i = 0;
        setActiveScreen(order[i]);
        return true;
    };
    const holder = createElement({
        style: {
            position: "relative",
            width: "calc(2 * var(--triangle-border-size))",
            height: "calc(2 * var(--triangle-border-size))",
            visibility: "hidden",
        },
    });
    holder.append(createElement({
        style: {
            [left ? "borderRight" : "borderLeft"]: "var(--triangle-border-size) solid var(--screen-font-border-color)",
        },
    }, "triangleBorder"), createElement({
        style: {
            [left ? "borderRight" : "borderLeft"]: "var(--triangle-size) solid var(--screen-font-color)",
        },
    }, "triangle"));
    holder.addEventListener("mouseenter", () => {
        holder.lastChild.style[left ? "borderRight" : "borderLeft"] = "var(--triangle-size) solid var(--the-one-and-only-red)";
        holder.firstChild.style[left ? "borderRight" : "borderLeft"] = "var(--triangle-border-size) solid var(--screen-font-color)";
    });
    holder.addEventListener("mouseleave", () => {
        holder.lastChild.style[left ? "borderRight" : "borderLeft"] = "var(--triangle-size) solid var(--screen-font-color)";
        holder.firstChild.style[left ? "borderRight" : "borderLeft"] = "var(--triangle-border-size) solid var(--screen-font-border-color)";
    });
    holder.lastChild?.addEventListener("click", clickArrow);
    return holder;
};
const setArrowVisibility = () => {
    const sites = Object.keys(unlockedScreens);
    if (sites.length <= 1 || activeScreen == null)
        return false;
    const order = sites.sort((a, b) => p.indexOf(a) - p.indexOf(b));
    const i = order.indexOf(activeScreen);
    if (i > 0)
        left.style.visibility = "visible";
    else
        left.style.visibility = "hidden";
    if (i < order.length - 1)
        right.style.visibility = "visible";
    else
        right.style.visibility = "hidden";
    return true;
};
const screen = createElement({}, "screenManager");
const left = createArrow();
const right = createArrow(false);
screen.append(left, right);
const ProductionSiteTitleMap = {
    potatofarm: "Kartoffelfeld",
    coppermine: "Kupfermine",
    powerplant: "Generator",
    forest: "Wald",
    ironmine: "Eisenmine",
    coalmine: "Kohlemine",
    steelplant: "Hochofen",
    blacksmith: "Schmied",
    sulfurmine: "Schwefelmine",
    alchemist: "Alchemist",
    gunsmith: "Büchsenmacher",
    uraniummine: "Uranmine",
    manhattan: "Manhattan-Projekt",
};
const createProductionSiteScreen = (site) => {
    const s = new ScreenView(site);
    s.mountChild(createElement({ tag: "div" }, "title"), {
        name: "title",
        onUpdate: (child) => {
            child.innerText = s.getParam("title");
        },
    });
    s.setParam("title", ProductionSiteTitleMap[site]);
    s.update();
    return s;
};
let unlockedScreens = {};
const unlockScreen = (site) => {
    if (site in unlockedScreens)
        return false;
    unlockedScreens[site] = createProductionSiteScreen(site);
    setArrowVisibility();
    return true;
};
let activeScreen = null;
const setActiveScreen = (site) => {
    if (!(site in unlockedScreens))
        return false;
    Clicker.setResource(ProductionSiteResourceMap[site]);
    if (activeScreen) {
        unlockedScreens[activeScreen]?.remove();
        Loop.removeScreen(activeScreen);
    }
    activeScreen = site;
    unlockedScreens[site]?.appendTo(body);
    Loop.registerScreen(unlockedScreens[site], site);
    Clicker.setResource(ProductionSiteResourceMap[site]);
    setArrowVisibility();
    Shop.setActiveScreen(activeScreen);
    return true;
};
const ScreenManager = {
    unlockScreen,
    start: () => {
        body.append(screen);
        unlockScreen("potatofarm");
        setActiveScreen("potatofarm");
    },
    setActiveScreen,
};
export default ScreenManager;
export { activeScreen };
