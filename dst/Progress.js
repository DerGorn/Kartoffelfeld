import Overlay from "./Overlay.js";
import { ResourceProductionSiteMap, r } from "./Resources.js";
import ScreenManager from "./ScreenManager.js";
const setCookie = (cookieName, cookieValue, expirationsDays = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + expirationsDays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};
const getCookie = (cookieName) => {
    let name = cookieName + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
const saveProgress = () => {
    const resourceQuantity = {};
    r.forEach((resource) => {
        const quantity = Overlay.getResource(resource);
        if (quantity !== undefined)
            resourceQuantity[resource] = quantity;
    });
    setCookie("resourceQuantity", JSON.stringify(resourceQuantity));
};
const loadProgress = () => {
    const cookie = getCookie("resourceQuantity");
    if (cookie === "")
        return false;
    const resourceQuantity = JSON.parse(cookie);
    Object.entries(resourceQuantity).forEach(([resource, quantity]) => {
        ScreenManager.unlockScreen(ResourceProductionSiteMap[resource]);
        Overlay.setResource(resource, quantity);
    });
    return true;
};
const existSave = () => {
    const cookie = getCookie("resourceQuantity");
    return !(cookie === "");
};
export { saveProgress, loadProgress, existSave };
