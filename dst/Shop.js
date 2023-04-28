import Clicker from "./Clicker.js";
import { body, createElement, formatNumber } from "./DOM.js";
import Loop from "./GameLoop.js";
import Notifier from "./Notifier.js";
import Overlay from "./Overlay.js";
import { ScreenView } from "./Screen.js";
const upgrades = {
    0: {
        id: 0,
        title: "Das Land erkunden",
        baseCost: { amount: 100, resource: "potato" },
        effect: () => {
            Clicker.setClickerStrength("potato", (s) => s + 1);
        },
        growth: () => { },
        unique: true,
    },
    1: {
        id: 1,
        title: "Bauer",
        baseCost: { amount: 10, resource: "potato" },
        effect: () => {
            Overlay.setIdleGain("potato", (g) => g + 1);
        },
        growth: function growth() {
            this.baseCost.amount *= 1 + this.level * 0.02;
        },
        level: 0,
    },
};
const boughtUpgrades = {};
const upgradesPerProductionSite = {
    potatofarm: [0, 1],
    coppermine: [],
    powerplant: [],
    forest: [],
    ironmine: [],
    coalmine: [],
    steelplant: [],
    blacksmith: [],
    sulfurmine: [],
    alchemist: [],
    gunsmith: [],
    uraniummine: [],
    manhattan: [],
};
const upgradeUnlocks = {
    0: [1],
};
const unlockedUpgrades = [0];
const resourceNameMap = {
    potato: "Kartoffeln",
    copper: "Kupfer",
    electricity: "Strom",
    wood: "Holz",
    iron: "Eisen",
    coal: "Kohle",
    steel: "Stahl",
    swords: "Schwerter",
    sulfur: "Schwefel",
    gunpowder: "Schwarz Pulver",
    gun: "Gewehre",
    uranium: "Uran",
    nuke: "Thermonuklearwaffen",
};
const createUpgrade = (upgrade) => {
    const holder = createElement({ id: upgrade.title }, "upgradeHolder");
    const title = createElement({}, "upgradeTitle");
    title.innerText =
        upgrade.title +
            (upgrade.level && upgrade.level > 0
                ? ": lvl." + upgrade.level?.toString()
                : "");
    const costHolder = createElement({}, "costHolder");
    const cost = createElement({}, "costText");
    cost.innerText = formatNumber(upgrade.baseCost.amount);
    const costIcon = createElement({ tag: "img" }, "costIcon");
    costIcon.src = `Icon/${upgrade.baseCost.resource}.png`;
    costHolder.append(cost, costIcon);
    holder.append(title, costHolder);
    holder.addEventListener("click", () => {
        if (!payUpgrade(upgrade)) {
            return;
        }
        unlockUpgrade(upgrade.id);
        screen.setParam("update", true);
    });
    return holder;
};
const populateShop = () => {
    if (activeScreen === null)
        return;
    shop.firstChild?.remove();
    const sacrifice = createElement({}, "shopSacrifice");
    sacrifice.addEventListener("wheel", (event) => {
        sacrifice.scrollLeft += event.deltaY;
    }, { passive: true });
    const validUpgrades = upgradesPerProductionSite[activeScreen].filter((id) => unlockedUpgrades.includes(id));
    validUpgrades.forEach((id) => {
        sacrifice.append(createUpgrade(upgrades[id]));
    });
    shop.append(sacrifice);
};
const screen = new ScreenView("shop");
const shop = createElement({ id: "shoHolder" }, "shopHolder");
shop.append(createElement({}, "shopSacrifice"));
let activeScreen = null;
screen.mountChild(shop, {
    onUpdate: (_) => {
        if (activeScreen === null)
            return;
        populateShop();
    },
});
let small = false;
const toggle = createElement({}, "shopToggle");
toggle.addEventListener("click", () => {
    shop.parentElement.style.flexGrow = small
        ? "0.5"
        : `${40 / window.innerHeight}`;
    small = !small;
    shop.style.opacity = small ? "0" : "1";
    toggle.style.transitionDelay = small ? "0.5s" : "0s";
    toggle.style.height = small ? "40px" : "20px";
    toggle.style.backgroundColor = `rgba(30,30,30,${small ? 0.2 : 0})`;
});
screen.mountChild(toggle);
toggle.click();
const payUpgrade = (upgrade) => {
    const available = Overlay.getResource(upgrade.baseCost.resource);
    if (available === undefined) {
        Notifier.show(`Du hast ${resourceNameMap[upgrade.baseCost.resource]} noch nicht entdeckt. Vielleicht solltest du die Gegend erkunden?`, { timerInMs: 2000 });
        return false;
    }
    const enough = available >= upgrade.baseCost.amount;
    if (!enough) {
        Notifier.show(`Du hast nicht genug ${resourceNameMap[upgrade.baseCost.resource]}.`, { timerInMs: 2000 });
        return false;
    }
    Overlay.setResource(upgrade.baseCost.resource, available - upgrade.baseCost.amount);
    return true;
};
const unlockUpgrade = (id) => {
    const upgrade = upgrades[id];
    const holder = document.querySelector(`div[id^="${upgrade.title}"]`);
    if (boughtUpgrades[id] === undefined)
        boughtUpgrades[id] = 0;
    boughtUpgrades[id] += 1;
    upgrade.effect();
    upgradeUnlocks[id]?.forEach((i) => {
        if (!unlockedUpgrades.includes(i))
            unlockedUpgrades.push(i);
    });
    if (upgrade.unique) {
        if (holder !== null)
            holder.remove();
        unlockedUpgrades.splice(unlockedUpgrades.indexOf(upgrade.id), 1);
        return;
    }
    if (upgrade.level === undefined)
        throw new Error(`Defect Upgrade. It is neither unique nor levelable. Title: ${upgrade.title}, Id: ${upgrade.id}`);
    upgrade.level++;
    upgrade.growth();
};
const Shop = {
    start: () => {
        screen.appendTo(body);
        Loop.registerScreen(screen, "shop");
    },
    setActiveScreen: (site) => {
        activeScreen = site;
        screen.setParam("update", true);
    },
    unlockUpgrade,
};
export default Shop;
export { boughtUpgrades };
