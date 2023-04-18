import { createElement } from "./DOM.js";
class ScreenView {
    #update = true;
    #screen;
    #title = "";
    #childOrder = ["title"];
    #onUpdate = {
        title: (child) => {
            child.innerText = this.#title;
        },
    };
    constructor() {
        this.#screen = createElement({ id: "screen" }, "screen");
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
    setterPrototyp(field, value) {
        this[`#${field}`] = value;
        this.#update = true;
    }
    set title(t) {
        this.setterPrototyp("title", t);
    }
    mountChild(child, { onUpdate = null, name = null, } = {}) {
        if (name == null)
            name = child.id;
        if (this.#childOrder.includes(name))
            return false;
        this.#childOrder.push(name);
        if (onUpdate != null)
            this.#onUpdate[name] = onUpdate;
        return true;
    }
    update() {
        if (!this.#update)
            return false;
        const children = this.#screen.children;
        console.log(this.#screen);
        for (let i = 0; i < children.length; i++) {
            const onUpdate = this.#onUpdate[this.#childOrder[i]];
            if (onUpdate != null)
                onUpdate(children[i]);
        }
        this.#update = false;
        return true;
    }
}
export { ScreenView };
