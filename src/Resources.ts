const r = ["potato", "copper"] as const;
type Resources = (typeof r)[number];
type ProductionSites = "potatofarm" | "coppermine";
const ResourceProductionSiteMap: {
  [key in Resources]: ProductionSites;
} = { potato: "potatofarm", copper: "coppermine" };
const ProductionSiteResourceMap: {
  [key in ProductionSites]: Resources;
} = { potatofarm: "potato", coppermine: "copper" };

export {
  r,
  Resources,
  ProductionSites,
  ResourceProductionSiteMap,
  ProductionSiteResourceMap,
};
