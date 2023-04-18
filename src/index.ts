import { createElement, body } from "./DOM.js";
import { ScreenView } from "./Screen.js";

const createDeafultScreen = (): HTMLDivElement => {
  const s = new ScreenView();
  s.title = "t";
  const screen = createElement({ id: "screen" }, "screen") as HTMLDivElement;
  return screen;
};

const buildPotatoFarm = (screen: HTMLDivElement): HTMLDivElement => {
  return screen;
};

const createScreen = (screen: "potatoFarm" = "potatoFarm"): HTMLDivElement => {
  switch (screen) {
    case "potatoFarm":
      return buildPotatoFarm(createDeafultScreen());
    default:
      throw new Error(
        `Fick dich. Der angegebene Screen exestiert nicht, du hast es dennoch geschafft ihn in die Funktion zu schummeln.\n\nSpecified screen = '${screen}'`
      );
  }
};

body.append(createScreen());
