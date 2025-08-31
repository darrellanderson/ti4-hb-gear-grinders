import { SystemSchemaType } from "ti4-ttpg-ts-types";

export const systems: Array<SystemSchemaType> = [
  {
    tile: 1001,
    isHome: true,
    planets: [
      {
        name: "Gear Prime",
        nsidName: "gear-prime",
        resources: 5,
        influence: 0,
      },
    ],
  },
];
