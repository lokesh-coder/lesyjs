import { store, onChange } from "@fabiospampinato/store";
import { parse as htmlparse } from "himalaya";
import logUpdate from "log-update";
import { minify } from "html-minifier";
import { flattenToStr } from "./utils";
import * as uiElements from "./elements";

interface Config {
  collapseWhitespace?: boolean;
  keepClosingSlash?: boolean;
  preserveLineBreaks?: boolean;
}

interface ElementDef {
  name: string;
  render: Function;
  onInit?: Function;
}

interface Element {
  [key: string]: ElementDef;
}

interface ElProp {
  key: string;
  value: string;
}

const defaultConfig = {
  collapseWhitespace: false,
  keepClosingSlash: true,
  preserveLineBreaks: false,
};

export default class Artist {
  private store: { [key: string]: any };
  private config: Config = defaultConfig;
  private onInitHook: Function = () => {};
  private elements = {};
  private timers = {
    internal: {},
    global: {},
  };
  private timerIDs = {
    internal: {},
    global: {},
  };
  private runningElTimers = [];

  constructor(config: Config = {}) {
    this.store = store({});
    this.config = { ...this.config, ...config };
    this.registerEls(uiElements);
  }

  registerEls(elements: Element) {
    const allElements = { ...this.elements, ...elements };
    Object.keys(allElements).forEach((key) => {
      const { name, ...data } = allElements[key];
      this.elements[name] = data;
    });
  }

  private runElHook(hook: Function, props: { [key: string]: any }) {
    if (!hook) return;
    hook({
      props,
      store: this.store,
      timer: this.registerInternalTimer.bind(this),
    });
  }

  private registerGlobalTimer(
    timerFunc: Function,
    interval: number,
    name: string,
  ) {
    this.timerIDs.global[name] = setInterval(timerFunc, interval);
    this.timers.global[name] = true;
  }

  private registerInternalTimer(
    timerFunc: Function,
    interval: number,
    name: string,
  ) {
    this.runningElTimers.push(name);
    if (this.timers.internal[name]) {
      return;
    }

    this.timerIDs.internal[name] = setInterval(timerFunc, interval);
    this.timers.internal[name] = true;
  }

  private clearUnusedTimers() {
    const allTimers = Object.keys(this.timers.internal);
    const runningElTimers = this.runningElTimers;
    const unusedTimers = allTimers.reduce((acc, item) => {
      if (!runningElTimers.includes(item)) acc.push(item);
      return acc;
    }, []);

    unusedTimers.forEach((name: string) => this.disposeTimer(name, "internal"));
    this.runningElTimers = [];
  }

  clearAllTimers() {
    Object.keys(this.timers.internal).forEach((name: string) =>
      this.disposeTimer(name, "internal"),
    );
    Object.keys(this.timers.global).forEach((name: string) =>
      this.disposeTimer(name, "global"),
    );
    this.runningElTimers = [];
  }

  disposeTimer(name: string, scope: string) {
    clearInterval(this.timerIDs[scope][name]);
    delete this.timers[scope][name];
  }

  private getProps(propsArr: ElProp[]) {
    return propsArr.reduce(
      (acc, prop) => Object.assign(acc, { [prop.key]: prop.value }),
      {},
    );
  }

  private renderEl(elements: any[]) {
    const output = [];
    elements.forEach((el) => {
      if (Array.isArray(el)) {
        output.push(this.renderEl(el));
        return;
      }
      const { attributes, tagName, type, content } = el;
      const props = this.getProps(attributes || []);
      const ctx = {
        tagName,
        props,
        renderEl: this.renderEl.bind(this),
        store: this.store,
      };

      if (type === "text" && content !== "") {
        const textEl = this.elements["text"];
        this.runElHook(textEl.init, props);
        const textRes = textEl.render(ctx, el);
        if (textRes) output.push(textRes);
      } else if (tagName) {
        const elFnDef = this.elements[tagName] || this.elements["unknown"];
        this.runElHook(elFnDef?.init, props);
        output.push(this.renderEl([htmlparse(elFnDef.render(ctx, el))]));
      }
    });

    return flattenToStr(output).join("");
  }

  rewriteScreen(output: string) {
    logUpdate(`[2K${output}`);
  }

  private updateScreen(tplFn: Function, init = true) {
    const tpl = tplFn(this.store);
    const tplsminified = minify(tpl, this.config);
    const elements = htmlparse(tplsminified);
    const output = this.renderEl(elements);
    if (!init) this.clearUnusedTimers();
    this.rewriteScreen(output);
  }

  onInit(fn: Function) {
    this.onInitHook = fn;
  }

  render(tplFn: Function) {
    this.onInitHook(this.store, this.registerGlobalTimer.bind(this));
    this.updateScreen(tplFn);
    onChange(this.store, () => {
      this.updateScreen(tplFn, false);
    });
  }
}

// const customElem = {
//   name: "custom",
//   render: () => `hello # <spinner type="moon"/> #`,
// };

// // USAGE

// const artist = new Artist();

// artist.registerEls({ customElem });

// let showSpinner = true;
// let showSpinner2 = false;

// artist.onInit((store, timer) => {
//   if (!store.count) store.count = 1;
//   timer(
//     () => {
//       store.count += 1;
//     },
//     1000,
//     "hello",
//   );

//   setTimeout(() => {
//     showSpinner = false;
//     showSpinner2 = true;
//   }, 1000);
// });

// artist.render((store) => {
//   return `
//   my name is <custom/> <text>hi</text> and ${store.count}

//   another spinner2: ${showSpinner2 && "<spinner/>"}

//   <text bold color='red'>another</text> spinner: ${showSpinner && "<spinner/>"}
//   // im a commebt
// /* me to */
// <box>
// <progress score="20"/>
//   </box>

// <text color="green"><row border>
//     <column>one</column>
//     <column>two</column>
//     <column>3</column>
//     </row></text>

// <div>hello</div><div>how are you</div>
// <span>hello</span><span>how are you</span>
// <div>you are <space length="300"/> yes <newline/> awesome </text>
// `;
// });

// setTimeout(() => {
//   artist.clearAllTimers();
// }, 2000);
