import { body, createElement } from "./DOM.js";
import Overlay from "./Overlay.js";
const clickerStrength = {
    potato: 1,
    copper: 1,
    electricity: 0,
    wood: 1,
    iron: 1,
    coal: 1,
    steel: 1,
    swords: 1,
    sulfur: 1,
    gunpowder: 1,
    gun: 1,
    uranium: 1,
    nuke: 0,
};
const click = () => {
    const count = Overlay.getResource(clickedResource);
    if (count === undefined) {
        console.log("There are no", clickedResource);
        return;
    }
    Overlay.setResource(clickedResource, count + clickerStrength[clickedResource]);
};
const clicker = createElement({ tag: "div", id: "clicker" }, "windowCover");
clicker.addEventListener("click", click);
let clickedResource;
const setResource = (name) => {
    clickedResource = name;
};
const setClickerStrength = (name, setterFunction) => {
    if (clickerStrength[name] === 0)
        return false;
    clickerStrength[name] = setterFunction(clickerStrength[name]);
    return true;
};
const Clicker = {
    start: () => {
        body.append(clicker);
    },
    setResource,
    setClickerStrength,
};
export default Clicker;
export { clickerStrength };
