import { createElement } from "./DOM.js";
class ScreenView {
    #update = true;
    #screen;
    #params = {};
    #childOrder = [];
    #onUpdate = {};
    constructor() {
        this.#screen = createElement({ id: "screen" }, "screen");
        return this;
    }
    setParam(param, value) {
        this.#params[param] = value;
        this.#update = true;
    }
    getParam(param) {
        return this.#params[param];
    }
    mountChild(child, { onUpdate = null, name = null, } = {}) {
        if (name == null)
            name = child.id;
        if (this.#childOrder.includes(name))
            return false;
        this.#childOrder.push(name);
        if (onUpdate != null)
            this.#onUpdate[name] = onUpdate;
        this.#screen.append(child);
        return true;
    }
    unmountChild(name) {
        delete this.#onUpdate[name];
        const index = this.#childOrder.indexOf(name);
        this.#childOrder.splice(index, 1);
        this.#screen.children[index].remove();
    }
    appendTo(parent) {
        parent.append(this.#screen);
    }
    remove() {
        this.#screen.remove();
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
