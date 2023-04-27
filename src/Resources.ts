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
] as const;
type Resources = (typeof r)[number];
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
] as const;
type ProductionSites = (typeof p)[number];
const populateMap = (keys: any, values: any) => {
  if (keys.length !== values.length) {
    throw new Error(
      `Stupid Fuck. You cant map arrays with different lengths to eachother. Found keys with length ${keys.length} asn values with length ${values.length}`
    );
  }
  const map: { [key in (typeof keys)[number]]: (typeof values)[number] } = {};
  keys.forEach((key: any, i: any) => {
    map[key] = values[i];
  });
  return map;
};
const ResourceProductionSiteMap = populateMap(r, p) as {
  [key in Resources]: ProductionSites;
};
const ProductionSiteResourceMap = populateMap(p, r) as {
  [key in ProductionSites]: Resources;
};

export {
  r,
  p,
  Resources,
  ProductionSites,
  ResourceProductionSiteMap,
  ProductionSiteResourceMap,
};
