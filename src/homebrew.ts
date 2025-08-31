import { refPackageId } from "@tabletop-playground/api";
import { HomebrewModuleType } from "ti4-ttpg-ts-types";

import { factions } from "./factions";
import { systems } from "./systems";

const packageId: string = refPackageId;

export const homebrew: HomebrewModuleType = {
  sourceAndPackageId: {
    source: "hb-gear-grinders",
    packageId,
  },
  factions,
  systems,
};
