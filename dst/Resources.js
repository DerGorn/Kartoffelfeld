const r = [
    "potato",
    "copper",
    "electricity",
    "wood",
    "iron",
    "coal",
    "steel",
    "swords",
    "sulfur",
    "gunpowder",
    "gun",
    "uranium",
    "nuke",
];
const p = [
    "potatofarm",
    "coppermine",
    "powerplant",
    "forest",
    "ironmine",
    "coalmine",
    "steelplant",
    "blacksmith",
    "sulfurmine",
    "alchemist",
    "gunsmith",
    "uraniummine",
    "manhattan",
];
const populateMap = (keys, values) => {
    if (keys.length !== values.length) {
        throw new Error(`Stupid Fuck. You cant map arrays with different lengths to eachother. Found keys with length ${keys.length} asn values with length ${values.length}`);
    }
    const map = {};
    keys.forEach((key, i) => {
        map[key] = values[i];
    });
    return map;
};
const ResourceProductionSiteMap = populateMap(r, p);
const ProductionSiteResourceMap = populateMap(p, r);
export { r, p, ResourceProductionSiteMap, ProductionSiteResourceMap, };
