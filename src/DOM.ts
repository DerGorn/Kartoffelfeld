type styleDeclaration = Partial<CSSStyleDeclaration> & {
  [propName: string]: string;
};

const body = document.getElementsByTagName("body")[0];

let idCounter = 0;
const getUniqueId = (id: string = "") => {
  return `${id}_${idCounter++}`;
};

const formatNumber = (num: number) => {
  return num < 100000 ? num.toFixed(0) : num.toPrecision(3).replace("+", "");
};

const createElement = (
  {
    tag = "div",
    id = "",
    style = {},
  }: {
    tag?: keyof HTMLElementTagNameMap;
    id?: string;
    style?: styleDeclaration;
  } = {},
  ...classes: string[]
): HTMLElement => {
  const el = document.createElement(tag);
  el.id = getUniqueId(id);
  el.classList.add(...classes);
  el.style.display;
  Object.entries(style).forEach(([property, value]) => {
    for (let match of property.matchAll(/[A-Z]+/g)) {
      const target = match[0];
      property = property.replace(target, `-${target.toLowerCase()}`);
    }
    el.style.setProperty(property, String(value));
  });
  return el;
};

export { createElement, body, formatNumber };
