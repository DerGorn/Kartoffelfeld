import { body, createElement } from "./DOM.js";
import Loop from "./GameLoop.js";
import { ScreenView } from "./Screen.js";
const overlay = new ScreenView("overlay");
const resourceQuantity = {};
const setResource = (name, value) => {
    if (resourceQuantity[name] === undefined)
        addResource(name);
    resourceQuantity[name] = value;
    overlay.setParam("update", true);
};
const getResource = (name) => {
    return resourceQuantity[name];
};
const addResource = (name) => {
    resourceQuantity[name] = 0;
    const container = createElement({ id: name }, "resourceContainer");
    const icon = createElement({ tag: "img" }, "resourceIcon");
    icon.src = `Icon/${name}.png`;
    const count = createElement({ tag: "p" }, "resourceCount");
    count.textContent = "0";
    container.append(icon, count);
    overlay.mountChild(container, {
        name,
        onUpdate: () => {
            count.textContent = `${resourceQuantity[name]}`;
        },
    });
};
const Overlay = {
    start: () => {
        overlay.appendTo(body);
        Loop.registerScreen(overlay, "overlay");
    },
    addResource,
    setResource,
    getResource,
};
export default Overlay;
export { resourceQuantity };
