import { TechSchemaType } from "ti4-ttpg-ts-types";

export const technologies: Array<TechSchemaType> = [
  {
    name: "Experimental Parts II",
    nsidName: "experimental-parts-2",
    prerequisites: { green: 2 },
    color: "unit-upgrade",
    replacesNsidName: "infantry",
  },
  {
    name: "Grinding Gears",
    nsidName: "grinding-gears",
    prerequisites: { yellow: 3 },
    color: "yellow",
  },
];
