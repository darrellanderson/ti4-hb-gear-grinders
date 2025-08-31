# ti4-hb-gear-grinders

The TI4 Homebrew Helper tool creates factions, systems, cards, etc from images and a TypeScript description of the homebrew.

You place your images and configuration files in a folder, then run Homebrew Helper to create the TTPG assets.

In a final step, move the assets to your TTPG mod. You can do this manually, or Homebrew Helper inclues @ThatRobHuman's ttpg-scripts which can do that for you.

## Initial setup

Create the directory, change into it and create a package.json file:

`% yarn init`

Add the `ti4-hb-helper` package:

`% yarn add ti4-hb-helper`

At this point your package.json file should have at least:

```
{
  "name": "ti4-hb-gear-grinders",
  "version": "1.0.0",
  "license": "Unlicense",
  "dependencies": {
    "ti4-hb-helper": "^1.0.75"
  }
}
```

Create a `jest.config.json` file. This will let you add code to your homebrew such as scripted unit modifiers, as well as provide the framework ti4-hb-helper needs to build your TTPG assets. Add the following to your `jest.config.json` file:

```
{
  "preset": "ts-jest",
  "testEnvironment": "node",
  "moduleNameMapper": {
    "^@tabletop-playground/api$": "ttpg-mock"
  }
}
```

Create a `tsconfig.json` file:

```
{
  "compilerOptions": {
    "checkJs": true,
    "lib": ["ES2023", "DOM"],
    "module": "node16",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "useUnknownInCatchVariables": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "rootDir": "./src",
    "baseUrl": "./src",
    "outDir": "./build",
    "moduleResolution": "node16",
    "target": "ES6",
    "sourceMap": true
  },
  "include": ["./src/**/*.ts"]
}
```

Now create the directories for your assets. For a typical faction you'll create:

```
prebuild/card/alliance
prebuild/card/faction-reference
prebuild/card/leader/agent
prebuild/card/leader/commander
prebuild/card/leader/hero
prebuild/card/leader/mech
prebuild/card/planet
prebuild/card/promissory
prebuild/card/tech
prebuild/faction-sheet
prebuild/icon/faction
prebuild/tile/system
prebuild/token/command-control
```

(you can also create system and planet attachments, custom tokens, strategy cards, etc).

Create a `src/generate.test.ts` file with:

```
import { generate } from "ti4-hb-helper";
import { homebrew } from "./homebrew";

it("generate", async () => {
  await generate(homebrew);
})
```

Create a `src/homebrew.ts` file with:

```
import { refPackageId } from "@tabletop-playground/api";
import { HomebrewModuleType } from "ti4-ttpg-ts-types";

const packageId: string = refPackageId;

export const homebrew: HomebrewModuleType = {
  sourceAndPackageId: {
    source: "hb-gear-grinders",
    packageId,
  },
};
```

Make sure you've got everything set up correctly, try creating your empty faction by running:

```
% yarn jest src/generate.test.ts
```

We're using a testing framework to run the asset creation, mostly because that lets us fake the TTPG API since it isn't actually running inside TTPG (necessary to support scripted unit modifiers and the like).

You'll see a bunch of "console.log" messages with messages about what files it is creating, followed by an error about missing the template directory. That's fine: your faction is currently empty so it didn't create any templates.

## Create your faction definition

Create a new `src/factions.ts` file with:

```
import { FactionSchemaType } from "ti4-ttpg-ts-types";

export const factions: Array<FactionSchemaType> = []
```

and update `src/generate.test.ts` to use it:

```
import { refPackageId } from "@tabletop-playground/api";
import { HomebrewModuleType } from "ti4-ttpg-ts-types";

import { factions } from "./factions";

const packageId: string = refPackageId;

export const homebrew: HomebrewModuleType = {
  sourceAndPackageId: {
    source: "hb-gear-grinders",
    packageId,
  },
  factions,
};
```

Now fill in your actual faction description. If you're using a TypeScript aware editor (such as VS Code), it will help you get the right field names and in some cases tell you if your values aren't legal (such as an unknown tech color).

See [src/factions.ts](https://github.com/darrellanderson/ti4-hb-gear-grinders/blob/main/src/factions.ts) for an example.

Note that most names are lower case with hyphens and no other punctuation.

In addition to `factions.ts`, you'll want to create `systems.ts`, `technology.ts`, `unit-attrs.ts` to define those things. See the files here for examples.

## Set up your art assets

When you declared your faction the "nsidName" entry is your internal faction name. In this example, the nsidName is `gear-grinders`.

Create your faction sheet using the nsidName as the filename: `prebuild/faction-sheet/gear-grinders.face.jpg` and `prebuild/faction-sheet/gear-grinders.back.jpg`. Your homebrew definition may contain multiple factions, place all the sheets in this same directory.

Most cards are named by the card name (to support multiple agents, etc).

Notice that you create individual cards, the generator will build needed card sheets. This should make iteration faster and easier.

## Enable TTPG injection

The same faction definition used to create the TTPG assets is used to tell the TTPG mod about your faction. With that information faction unpack can fetch your leaders, set up your starting units, and so on.

Create a `src/inject.ts` script with:

```
import { homebrew } from "homebrew";
import { NSID_TO_TEMPLATE_ID } from "nsid-to-template-id"; // generated

homebrew.nsidToTemplateId = NSID_TO_TEMPLATE_ID;
TI4.homebrewRegistry.load(homebrew);
```

When TTPG loads a package with an inject script, the homebrew loader picks it up and loads it for you. If you enable the [game > advanced > script ui] setting you can check the console for any errors. If you were using a TypeScript aware editor to create your files you're less likely to see any problems (most commonly you used an illegal name when it was supposed to be lower case with hyphens).

## Creating your TTPG mod

The generate script creates an `assets` directory with your TTPG assets. You can manually copy the into your TTPG mod, or use @ThatRobHuman's [create-ttpg-package](https://github.com/RobMayer/create-ttpg-package) to do it for you (included with ti4-hb-helper, this requires a little more technical knowledge).

## TTPG validation

Adding your faction mod automatically adds your faction reference card. Move it near a player area and right click it to unpack your faction.

In addition, you can type "/validate factions" in the chat window to verify everything is set up correctly (all leaders exist, etc).
