import { body, createElement, formatNumber } from "./DOM.js";
import Loop from "./GameLoop.js";
import { Resources } from "./Resources.js";
import { ScreenView } from "./Screen.js";

const overlay = new ScreenView("overlay");
const resourceQuantity: { [key in Resources]?: number } = {};

const setResource = (name: Resources, value: number) => {
  if (resourceQuantity[name] === undefined) addResource(name);
  resourceQuantity[name] = value;
  overlay.setParam("update", true);
};

const getResource = (name: Resources) => {
  return resourceQuantity[name];
};

const addResource = (name: Resources) => {
  resourceQuantity[name] = 0;
  const container = createElement({ id: name }, "resourceContainer");
  const icon = createElement(
    { tag: "img" },
    "resourceIcon"
  ) as HTMLImageElement;
  icon.src = `Icon/${name}.png`;
  const count = createElement(
    { tag: "p" },
    "resourceCount"
  ) as HTMLParagraphElement;
  count.textContent = "0";
  container.append(icon, count);
  overlay.mountChild(container, {
    name,
    onUpdate: () => {
      const quantity = resourceQuantity[name];
      if (quantity === undefined) return;
      count.textContent = formatNumber(quantity);
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
};

export default Overlay;
export { resourceQuantity };