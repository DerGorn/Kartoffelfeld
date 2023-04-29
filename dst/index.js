import Clicker from "./Clicker.js";
import Loop from "./GameLoop.js";
import Notifier from "./Notifier.js";
import Overlay from "./Overlay.js";
import { existSave, loadProgress, saveProgress } from "./Progress.js";
import ScreenManager from "./ScreenManager.js";
import Shop from "./Shop.js";
Loop.start();
Notifier.start();
if (existSave()) {
    ScreenManager.start();
    Overlay.start();
    Clicker.start();
    Shop.start();
    loadProgress();
}
else {
    Notifier.show("Wilkommen auf dem Kartoffelfeld Kamerad. Um den gerechten Kampf zu führen bedarf es Kraft. Kartoffeln geben kraft, also ernte so viele wie du kannst.", {
        callback() {
            ScreenManager.start();
            Overlay.start();
            Clicker.start();
            Shop.start();
        },
    });
}
window.addEventListener("unload", saveProgress);
