import { parse as htmlparse } from "himalaya";
import { minify } from "html-minifier";
import { store as storeDate, onChange } from "@fabiospampinato/store";
import handlebars from "handlebars";
import logUpdate from "log-update";
import * as displayElements from "./elements";
import * as customElements from "./custom-elements";
import { flattenToStr } from "./utils";

class ArtistClass {
  private localStore: any = {};
  private updatedStore = null;
  private elements = {};

  constructor() {
    this.registerElements(displayElements);
    this.registerElements(customElements);
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
    return minify(tplStr);
  }

  compileTpl(tplStr: string) {
    const currentStore = this.updatedStore || this.localStore.store;
    return handlebars.compile(minify(tplStr))(currentStore);
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
  }

  updateDisplay(displayStr: string) {
    logUpdate(displayStr);
  }

  visitElements(elements: any[]) {
    const strData = [];
    elements.forEach((el) => {
      if (Array.isArray(el)) {
        strData.push(this.visitElements(el));
        return;
      }

      // todo: pass disposer
      if (el.tagName) {
        strData.push(
          this.elements[el.tagName](
            el,
            this.visitElements.bind(this),
            this.localStore.store,
          ),
        );
      }

      if (el.type === "text" && el.content !== "\n") {
        const textData = this.elements["text"](el);
        if (textData) strData.push(textData);
      }
    });
    return flattenToStr(strData);
  }

  render(tplStr: string) {
    const minifiedStr = this.minifyTpl(tplStr);
    const compiledStr = this.compileTpl(minifiedStr);
    const elements = this.parseTpl(compiledStr);
    const elementsStr = this.getElementsStr(elements);
    this.updateDisplay(elementsStr);
  }

  registerElements(elements: any) {
    this.elements = { ...this.elements, ...elements };
  }

  paint(tplStr: string) {
    const cb = (updatedStore: any) => {
      this.updatedStore = updatedStore;
      this.render(tplStr);
    };
    this.render(tplStr);
    this.watchStoreChanges(cb);
  }
}

export default ArtistClass;
