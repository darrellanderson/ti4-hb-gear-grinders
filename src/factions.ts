import { FactionSchemaType } from "ti4-ttpg-ts-types";

export const factions: Array<FactionSchemaType> = [
  {
    name: "Gear Grinders",
    nsidName: "gear-grinders",
    abbr: "Grinders",
    abilities: ["industrial-initiative", "faction-ability-two"],
    breakthroughs: [],
    commodities: 2,
    factionTechs: ["experimental-parts-2", "grinding-gears"],
    home: 1001,
    leaders: {
      agents: ["robur-the-conqueror"],
      commanders: ["the-octopus"],
      heroes: ["the-tentacles-embrace"],
      mechs: ["eight-armed-terror"],
    },
    promissories: ["industrial-embrace"],
    startingTechs: ["duranium-armor"],
    startingUnits: {
      dreadnought: 1,
      cruiser: 1,
      mech: 1,
      infantry: 4,
      spaceDock: 1,
    },
    unitOverrides: ["the-great-tentable", "experimental-parts-1"],
  },
];
