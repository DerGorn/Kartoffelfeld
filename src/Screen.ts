import { createElement } from "./DOM.js";

class ScreenView {
  #update: Boolean = true;
  #screen: HTMLDivElement;
  #params: { [key: string]: any } = {};
  #childOrder: string[] = [];
  #onUpdate: { [key: string]: (child: HTMLElement) => void } = {};
  constructor() {
    this.#screen = createElement({ id: "screen" }, "screen") as HTMLDivElement;
    return this;
  }

  setParam(param: string, value: any) {
    this.#params[param] = value;
    this.#update = true;
  }

  getParam(param: string) {
    return this.#params[param];
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
    this.#screen.append(child);
    return true;
  }

  unmountChild(name: string) {
    delete this.#onUpdate[name];
    const index = this.#childOrder.indexOf(name);
    this.#childOrder.splice(index, 1);
    this.#screen.children[index].remove();
  }

  appendTo(parent: HTMLElement) {
    parent.append(this.#screen);
  }

  remove() {
    this.#screen.remove();
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
