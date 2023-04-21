import Clicker from "./Clicker.js";
import { createElement, body } from "./DOM.js";
import Loop from "./GameLoop.js";
import Overlay from "./Overlay.js";
import { loadProgress } from "./Progress.js";
import { ProductionSites, ProductionSiteResourceMap } from "./Resources.js";
import { ScreenView } from "./Screen.js";

const ProductionSiteTitleMap: { [key in ProductionSites]: string } = {
  potatofarm: "Kartoffelfeld",
  coppermine: "Kupfermine",
};

const createProductionSiteScreen = (site: ProductionSites): ScreenView => {
  const s = new ScreenView(site);
  s.mountChild(createElement({ tag: "div" }, "title"), {
    name: "title",
    onUpdate: (child) => {
      child.innerText = s.getParam("title");
    },
  });
  s.setParam("title", ProductionSiteTitleMap[site]);
  Clicker.setResource(ProductionSiteResourceMap[site]);
  s.update();
  return s;
};

Overlay.start();
Overlay.addResource("potato");
Overlay.addResource("copper");
loadProgress();
Clicker.start();
const farm = createProductionSiteScreen("coppermine");
farm.appendTo(body);
Loop.registerScreen(farm, "farm");
Loop.start();
