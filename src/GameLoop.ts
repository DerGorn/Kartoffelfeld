import { saveProgress } from "./Progress.js";
import { ScreenView } from "./Screen.js";

let TARGETFPS = 30;
let END = false;
let AutosaveTime = 5000;

const registeredScreens: { [key: string]: ScreenView } = {};

let lastUpdate = 0;
const loop = (time: number) => {
  if (time - lastUpdate >= 1000 / TARGETFPS) {
    update(time);
    lastUpdate = time;
  }
  if (!END) requestAnimationFrame(loop);
};

let lastSave = 0;
const update = (time: number) => {
  Object.values(registeredScreens).forEach((screen) => screen.update());
  if (time - lastSave > AutosaveTime) saveProgress();
};

const registerScreen = (screen: ScreenView, name: string) => {
  registeredScreens[name] = screen;
};

const removeScreen = (name: string) => {
  delete registeredScreens[name];
};

const Loop = {
  start: (targetFPS: number = 30) => {
    END = false;
    TARGETFPS = targetFPS;
    requestAnimationFrame(loop);
  },
  pause: () => {
    END = true;
  },
  registerScreen,
  removeScreen,
};

export default Loop;
export { TARGETFPS };
