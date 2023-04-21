import { saveProgress } from "./Progress.js";
let TARGETFPS = 30;
let END = false;
let AutosaveTime = 5000;
const registeredScreens = {};
let lastUpdate = 0;
const loop = (time) => {
    if (time - lastUpdate >= 1000 / TARGETFPS) {
        update(time);
        lastUpdate = time;
    }
    if (!END)
        requestAnimationFrame(loop);
};
let lastSave = 0;
const update = (time) => {
    Object.values(registeredScreens).forEach((screen) => screen.update());
    if (time - lastSave > AutosaveTime)
        saveProgress();
};
const registerScreen = (screen, name) => {
    registeredScreens[name] = screen;
};
const removeScreen = (name) => {
    delete registeredScreens[name];
};
const Loop = {
    start: (targetFPS = 30) => {
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
