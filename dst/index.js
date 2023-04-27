import Clicker from "./Clicker.js";
import Loop from "./GameLoop.js";
import Notifier from "./Notifier.js";
import Overlay from "./Overlay.js";
import { existSave, loadProgress } from "./Progress.js";
import ScreenManager from "./ScreenManager.js";
import Shop from "./Shop.js";
if (existSave()) {
    ScreenManager.start();
    Overlay.start();
    loadProgress();
    Clicker.start();
    Shop.start();
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
Notifier.start();
Loop.start();
