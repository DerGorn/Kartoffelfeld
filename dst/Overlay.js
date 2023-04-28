import { body, createElement, formatNumber } from "./DOM.js";
import Loop, { TARGETFPS } from "./GameLoop.js";
import { ScreenView } from "./Screen.js";
const overlay = new ScreenView("overlay");
const resourceQuantity = {};
const idleGain = {};
const setIdleGain = (name, setterFunction) => {
    let gain = idleGain[name];
    if (gain === undefined) {
        addResource(name);
        gain = 0;
    }
    idleGain[name] = setterFunction(gain);
};
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
    idleGain[name] = 0;
    const container = createElement({ id: name }, "resourceContainer");
    const icon = createElement({ tag: "img" }, "resourceIcon");
    icon.src = `Icon/${name}.png`;
    const count = createElement({ tag: "p" }, "resourceCount");
    count.textContent = "0";
    container.append(icon, count);
    overlay.mountChild(container, {
        name,
        onUpdate: () => {
            const quantity = resourceQuantity[name];
            if (quantity === undefined)
                return;
            if (idleGain[name])
                resourceQuantity[name] +=
                    idleGain[name] / TARGETFPS;
            count.textContent = formatNumber(quantity);
            overlay.setParam("update", true);
        },
    });
};
const Overlay = {
    start: () => {
        overlay.appendTo(body);
        Overlay.setResource("potato", 0);
        Loop.registerScreen(overlay, "overlay");
    },
    addResource,
    setResource,
    getResource,
    setIdleGain,
};
export default Overlay;
export { resourceQuantity };
