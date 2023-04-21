import { body, createElement } from "./DOM.js";
import Overlay from "./Overlay.js";
import { Resources } from "./Resources.js";

const clicker = createElement({ tag: "div", id: "clicker" }, "windowCover");
clicker.addEventListener("click", () => {
  const count = Overlay.getResource(clickedResource);
  if (count === undefined) {
    console.log("There are no", clickedResource);
    return;
  }
  Overlay.setResource(clickedResource, count + 1);
});
let clickedResource: Resources;

const setResource = (name: Resources) => {
  clickedResource = name;
};

const Clicker = {
  start: () => {
    body.append(clicker);
  },
  setResource,
};

export default Clicker;
