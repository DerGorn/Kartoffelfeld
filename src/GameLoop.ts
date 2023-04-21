import { ScreenView } from "./Screen.js";

let TARGETFPS = 30;
let END = false;

const registeredScreens: { [key: string]: ScreenView } = {};

let lastUpdate = 0;
const loop = (time: number) => {
  if (time - lastUpdate >= 1000 / TARGETFPS) {
    update();
    lastUpdate = time;
  }
  if (!END) requestAnimationFrame(loop);
};

const update = () => {
  Object.values(registeredScreens).forEach((screen) => screen.update());
};

const registerScreen = (screen: ScreenView, name: string) => {
  registeredScreens[name] = screen;
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
};

export default Loop;
