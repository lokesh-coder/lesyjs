// tslint:disable-next-line: import-name
import Artist from "../src";

const delay = (ms: number) => new Promise((r: Function) => setTimeout(r, ms));
describe("artist ui", () => {
  let artist: Artist;
  let output: any;

  beforeEach(() => {
    artist = new Artist();
    artist.rewriteScreen = jest.fn().mockImplementation((input) => {
      output = input;
    });
  });

  afterAll(() => {
    artist.clearAllTimers();
    artist = null;
  });

  it("should load default elements", () => {
    expect(Object.keys(artist["elements"])).toEqual([
      "column",
      "div",
      "newline",
      "row",
      "space",
      "span",
      "text",
      "spinner",
      "progress",
      "unknown",
      "box",
    ]);
  });
  it("should preserve whitespace", () => {
    const tpl = `line1

    line2`;
    artist.render(() => tpl);
    expect(output).toEqual(tpl);
  });
  it("should remove whitespace", () => {
    artist["config"].collapseWhitespace = true;
    const tpl = `line1

    line2`;
    const expected = `line1 line2`;
    artist.render(() => tpl);
    expect(output).toEqual(expected);
  });
  it("should preserve line breaks", () => {
    artist["config"].preserveLineBreaks = true;
    const tpl = `line1

    line2`;
    artist.render(() => tpl);
    expect(output).toEqual(tpl);
  });
  it("should register new elements", () => {
    const tagEl = {
      name: "tag",
      render: () => `I am tag!`,
    };
    artist.registerEls({ tagEl });
    artist.render(() => `<tag></tag>`);
    expect(output).toEqual("I am tag!");
  });
  it("should run init hook for elements", () => {
    const tagEl = {
      name: "tag",
      init: ({ store }) => {
        if (!store.tags) store.tags = ["one", "two"];
      },
      render: ({ store }) => `I am tag!- ${store.tags}`,
    };
    artist.registerEls({ tagEl });
    artist.render(() => `<tag></tag>`);
    expect(output).toEqual("I am tag!- one,two");
  });
  it("should convert element data to object", () => {
    const tagEl = {
      name: "tag",
      init: ({ store }) => {
        if (!store.tags) store.tags = ["one", "two"];
      },
      render: (_: any, data: any) => JSON.stringify(data),
    };
    artist.registerEls({ tagEl });
    artist.render(() => `<tag name="hi">one</tag>`);
    expect(output).toEqual(
      JSON.stringify({
        type: "element",
        tagName: "tag",
        attributes: [{ key: "name", value: "hi" }],
        children: [{ type: "text", content: "one" }],
      }),
    );
  });
  it("should get element props", () => {
    const tagEl = {
      name: "tag",
      render: (ctx: any) => `props: ${Object.entries(ctx.props)}`,
    };
    artist.registerEls({ tagEl });
    artist.render(() => `<tag name="doe" age="21" bool="false">one</tag>`);
    expect(output).toEqual("props: name,doe,age,21,bool,false");
  });
  it("should recursively load elements", () => {
    const tagEl = {
      name: "tag",
      render: () => `<text>hello</text>`,
    };
    artist.registerEls({ tagEl });
    artist.render(() => `@<div><tag></tag> ##</div>@`);
    expect(output).toEqual(`@
hello ##
@`);
  });
  it("should run global init", () => {
    artist.onInit((store: any) => {
      if (store.count === undefined) store.count = 0;
    });
    artist.render((store: any) => `<text>counter ${store.count}</text>`);
    expect(output).toEqual("counter 0");
  });
  it("should run global init timer", async () => {
    artist.onInit((store: any, timer: Function) => {
      if (store.count === undefined) store.count = 0;
      timer(() => {
        store.count += 1;
      }, 500);
    });

    artist.render((store: any) => `<text>counter ${store.count}</text>`);
    await delay(1000);
    expect(output).toEqual("counter 1");
    artist.clearAllTimers();
  });
  it("should run internal timer", async () => {
    const tagEl = {
      name: "tag",
      init: ({ store, timer }) => {
        if (store.num === undefined) store.num = 0;
        timer(
          () => {
            store.num += 1;
          },
          100,
          "someid",
        );
      },
      render: ({ store }) => `I am tag!- ${store.num}`,
    };
    artist.registerEls({ tagEl });
    artist.render(() => `<tag></tag>`);
    await delay(200);
    artist.clearAllTimers();
    expect(output).toEqual("I am tag!- 1");
  });
  xit("should clear all unsued timers", () => {
    jest.useFakeTimers();
    artist.onInit(async (store: any) => {
      store.dotsSpinner = true;
      store.arcSpinner = false;
      await delay(200);
      store.dotsSpinner = true;
      store.arcSpinner = false;
    });
    artist.render(
      (store: any) =>
        `${store.dotsSpinner ? `<spinner type="dots"/>` : ""}${
          store.arcSpinner ? `<spinner type="arc"/>` : ""
        }`,
    );
    expect(artist["runningElTimers"]).toEqual(["dots"]);
    artist.clearAllTimers();
    jest.useRealTimers();
  });
  xit("should dispose all timers", () => {
    jest.useFakeTimers();
    artist.onInit((store: any, timer: Function) => {
      if (store.count === undefined) store.count = 0;
      timer(() => (store.count += 1), 100, "count");
    });
    artist.render(() => `1<spinner/>`);
    expect(artist["timers"]).toEqual({
      global: { count: true },
      internal: { dots: true },
    });
    artist.clearAllTimers();
    expect(artist["timers"]).toEqual({ global: {}, internal: {} });
    jest.useRealTimers();
  });

  xit("should update display text on store change", async () => {
    artist.render((store: any) => `name - ${store.name}`);
    expect(output).toEqual("name - undefined");
    artist["store"].name = "foobar";
    await delay(10);
    expect(output).toEqual("name - foobar");
  });
});
