// tslint:disable import-name
import { parse as htmlparse } from "himalaya";
import { minify } from "html-minifier";
import { store as storeDate, onChange } from "@fabiospampinato/store";
import handlebars from "handlebars";
import logUpdate from "log-update";
import memoizeOne from "memoize-one";
import isDeepEqual from "lodash.isequal";
import * as uiElements from "./elements";
import { flattenToStr } from "./utils";

class ArtistClass {
  private localStore: any = {};
  private previousStores = [];
  private updatedStore = null;
  private elements = {};
  private chalk = {};
  private disposers = [];
  private timers = {};
  private invokedTimers = [];

  constructor(chalk = {}) {
    this.registerElements(uiElements);
    this.registerTemplateHelpers();
    this.chalk = chalk;
  }

  createStore(data: any) {
    this.localStore = {
      store: storeDate(data),
    };
  }

  get store() {
    return this.localStore.store;
  }

  minifyTpl(tplStr: string) {
    return minify(tplStr, { collapseWhitespace: true });
  }

  compileTpl(tplStr: string) {
    const currentStore = this.updatedStore || this.localStore.store;
    return handlebars.compile(tplStr)(currentStore);
  }

  parseTpl(tplStr: string) {
    return htmlparse(tplStr);
  }

  getElementsStr(elements: any) {
    return this.visitElements(elements)
      .filter((x: any) => x !== "")
      .join("");
  }

  watchStoreChanges(cb: any) {
    onChange(this.localStore.store, cb);
  }

  registerTemplateHelpers() {
    handlebars.registerHelper("eq", function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    });
    handlebars.registerHelper("neq", function (arg1, arg2, options) {
      return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
    });
    handlebars.registerHelper("list", (context, options) => {
      let ret = "";

      // tslint:disable-next-line: no-increment-decrement
      for (let i = 0, j = context.length; i < j; i++) {
        ret += `<key index="${i}">${options.fn(context[i])}</key>`;
      }

      return ret;
    });
  }

  updateDisplay(displayStr: string) {
    logUpdate(displayStr);
  }

  getProps(passedPropsArray = [], defaultProps = {}) {
    const passedProps = {};
    passedPropsArray.forEach(({ key, value }) => {
      passedProps[key] = value;
    });

    return { ...defaultProps, ...passedProps };
  }

  registerAndInvokeTimer(id, name, func, ms) {
    this.invokedTimers.push(id);
    if (this.timers[id]?.[name]) {
      return;
    }
    this.timers[id] = {
      [name]: func,
    };
    const intervalId = setInterval(func, ms);
    this.timers[id]["intervalId"] = intervalId;
  }

  collectDisposer(id: string, disposerFn: Function) {
    this.disposers.push({ id, func: disposerFn });
  }

  dispose(all: boolean = false) {
    const diposableItems = this.getChangedStore();
    this.disposers.forEach((dis) => {
      if (diposableItems.includes(dis.id) || all) dis.func();
    });
  }

  clearUnusedTimers() {
    Object.keys(this.timers).forEach((t) => {
      if (!this.invokedTimers.includes(t)) {
        clearInterval(this.timers[t]["intervalId"]);
      }
    });
  }

  clearTimers() {
    Object.keys(this.timers).forEach((key: any) => {
      clearInterval(this.timers[key].intervalId);
    });
  }

  getMemoizedFn(func: any) {
    return memoizeOne(func, (newArgs, oldArgs) => {
      return isDeepEqual(newArgs, oldArgs);
    });
  }

  addElementID(tplStr: string, idGenerator = null) {
    const id = idGenerator
      ? idGenerator
      : () => Math.round(Math.random() * 1000);
    return tplStr.replace(
      /<(([a-z0-9\-]+)(((\s?(?!id\=\"([a-z0-9\-]+)\"))([a-z0-9\-\=\"]*))+))(\/?)>/g,
      (_, ...g) => `<${g[0]} id="${g[1]}-${id()}"${g[7]}>`,
    );
  }

  getElementStore(el: any) {
    if (!el.attributes || !Array.isArray(el.attributes)) return {};
    const idItem = el.attributes.find((attr: any) => attr.key === "id");
    let id = null;
    if (idItem) id = idItem.value;
    if (!idItem) return {};
    if (!this.localStore.store[id]) this.localStore.store[id] = {};
    return this.localStore.store[id];
  }

  getChangedStore() {
    const changedStoreItems = [];
    const lastItemIndex = this.previousStores.length - 1;
    const prevStoreSnapshot = this.previousStores[lastItemIndex];
    const storeKeys = Object.keys(this.store);
    storeKeys.forEach((key) => {
      if (!isDeepEqual(this.store[key], prevStoreSnapshot[key])) {
        changedStoreItems.push(key);
      }
    });
    return changedStoreItems;
  }

  visitElements(elements: any[]) {
    const strData = [];
    elements.forEach((el) => {
      if (Array.isArray(el)) {
        strData.push(this.visitElements(el));
        return;
      }

      const elProps = this.getProps(el.attributes);
      const elementCtx = {
        visitElements: this.visitElements.bind(this),
        store: this.getElementStore(el),
        getProps: this.getProps.bind(this, el.attributes),
        color: this.chalk,
        tagName: el.tagName,
        disposer: this.collectDisposer.bind(this, elProps["id"]),
        timer: this.registerAndInvokeTimer.bind(this, elProps["id"]),
      };

      if (el.type === "text" && el.content !== "\n") {
        const textData = this.elements["text"](el, elementCtx);
        if (textData) strData.push(textData);
      } else if (el.tagName) {
        const elemFnDef = this.elements[el.tagName];
        const elemFn = elemFnDef ? elemFnDef : this.elements["unknown"];
        strData.push(elemFn(el, elementCtx));
      }
    });
    return flattenToStr(strData);
  }

  render(tplStr: string) {
    this.clearUnusedTimers();
    this.invokedTimers = [];
    const minifiedStr = this.minifyTpl(tplStr);
    const compiledStr = this.compileTpl(minifiedStr);
    const elements = this.parseTpl(compiledStr);
    const elementsStr = this.getElementsStr(elements);
    this.updateDisplay(elementsStr);
  }

  registerElements(elements: any) {
    const allElements = { ...this.elements, ...elements };
    this.elements = {};
    Object.keys(allElements).forEach((name) => {
      this.elements[name] = this.getMemoizedFn(allElements[name]);
    });
  }

  paint(tplStr: string) {
    const updatedTplStr = this.addElementID(tplStr);
    const cb = (updatedStore: any) => {
      this.dispose();
      this.updatedStore = updatedStore;
      this.render(updatedTplStr);
      this.previousStores.push(JSON.parse(JSON.stringify(updatedStore)));
    };
    this.previousStores.push(JSON.parse(JSON.stringify(this.store)));
    this.watchStoreChanges(cb);
    this.render(updatedTplStr);
  }
}

export default ArtistClass;
