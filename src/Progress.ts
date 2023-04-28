import Overlay from "./Overlay.js";
import { ResourceProductionSiteMap, Resources, r } from "./Resources.js";
import ScreenManager from "./ScreenManager.js";
import Shop, { Id, boughtUpgrades } from "./Shop.js";

const setCookie = (
  cookieName: string,
  cookieValue: string,
  expirationsDays: number = 365
) => {
  const d = new Date();
  d.setTime(d.getTime() + expirationsDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};

const getCookie = (cookieName: string) => {
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
  const resourceQuantity: { [key in Resources]?: number } = {};
  r.forEach((resource) => {
    const quantity = Overlay.getResource(resource);
    if (quantity !== undefined) resourceQuantity[resource] = quantity;
  });
  setCookie("resourceQuantity", JSON.stringify(resourceQuantity));
  setCookie("boughtUpgrades", JSON.stringify(boughtUpgrades));
};

const loadProgress = () => {
  const cookie = getCookie("resourceQuantity");
  if (cookie === "") return false;
  const resourceQuantity = JSON.parse(cookie);
  Object.entries(resourceQuantity).forEach(
    ([resource, quantity]: [Resources, number]) => {
      ScreenManager.unlockScreen(ResourceProductionSiteMap[resource]);
      Overlay.setResource(resource, quantity);
    }
  );
  let boughtUpgrade = JSON.parse(getCookie("boughtUpgrades")) as {
    [key in Id]?: number;
  };
  Object.entries(boughtUpgrade).forEach(([id, amount]) => {
    //@ts-ignore
    for (let i = 0; i < amount; i++) Shop.unlockUpgrade(Number(id) as Id);
  });
  return true;
};

const existSave = () => {
  const cookie = getCookie("resourceQuantity");
  return !(cookie === "");
};

export { saveProgress, loadProgress, existSave };
