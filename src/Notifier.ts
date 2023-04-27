import { body, createElement } from "./DOM.js";

const notifier = createElement(
  { style: { visibility: "hidden", opacity: "0" } },
  "notifier"
);
let visible = false;

notifier.addEventListener("click", () => {
  visible = false;
  notifier.style.opacity = "0";
  setTimeout(() => {
    if (!visible) notifier.style.visibility = "hidden";
  }, 1000);
});

const show = (
  message: string,
  {
    callback = () => {},
    timerInMs = -1,
  }: { callback?: () => any; timerInMs?: number } = {}
) => {
  visible = true;
  notifier.style.visibility = "visible";
  notifier.style.opacity = "1";
  notifier.innerText = message;
  const click = () => {
    callback();
    notifier.removeEventListener("click", click);
  };
  notifier.addEventListener("click", click);
  if (timerInMs > 0) {
    setTimeout(() => {
      if (visible) notifier.click();
    }, timerInMs);
  }
};

const Notifier = {
  start: () => {
    body.append(notifier);
  },
  show,
};

export default Notifier;
