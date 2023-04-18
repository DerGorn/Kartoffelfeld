import { createElement } from "./DOM.js";

class ScreenView {
  #update: Boolean = true;
  #screen: HTMLDivElement;
  #title: string = "";
  #childOrder: string[] = ["title"];
  #onUpdate: { [key: string]: (child: HTMLElement) => void } = {
    title: (child: HTMLElement) => {
      child.innerText = this.#title;
    },
  };
  constructor() {
    this.#screen = createElement({ id: "screen" }, "screen") as HTMLDivElement;
    const id = this.#screen.id;
    const children = this.#childOrder.map((name) => {
      const el = createElement({ id }, name);
      return el;
    });
    this.#screen.append(...children);
    this.update();
    return this;
  }

  get screen() {
    return this.#screen;
  }

  setterPrototyp(field: string, value: any) {
    (this as any)[`#${field}`] = value;
    this.#update = true;
  }

  set title(t: string) {
    this.setterPrototyp("title", t);
  }

  mountChild(
    child: HTMLElement,
    {
      onUpdate = null,
      name = null,
    }: {
      onUpdate?: ((child: HTMLElement) => void) | null;
      name?: string | null;
    } = {}
  ): Boolean {
    if (name == null) name = child.id;
    if (this.#childOrder.includes(name)) return false;
    this.#childOrder.push(name);
    if (onUpdate != null) this.#onUpdate[name] = onUpdate;
    return true;
  }

  update(): Boolean {
    if (!this.#update) return false;
    const children = this.#screen.children;
    console.log(this.#screen);
    for (let i = 0; i < children.length; i++) {
      const onUpdate = this.#onUpdate[this.#childOrder[i]];
      if (onUpdate != null) onUpdate(children[i] as HTMLElement);
    }
    this.#update = false;
    return true;
  }
}

export { ScreenView };
