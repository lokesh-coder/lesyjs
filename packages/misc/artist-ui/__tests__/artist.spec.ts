// tslint:disable: import-name
import Artist from "../src";

describe("artist ui", () => {
  let artist: Artist;

  beforeEach(() => {
    artist = new Artist();
    artist.createStore({});
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
      "key",
      "box",
    ]);
  });
  it("should memoize the elements function", () => {
    let count = 0;
    const dummyElement = () => {
      count += 1;
      return `dummy-text - ${count}`;
    };
    artist["registerElements"]({ dummyElement });
    const items = Array(2).fill("");
    const elemFn = artist["elements"]["dummyElement"];
    items.forEach(() => expect(elemFn()).toEqual("dummy-text - 1"));
  });
  it("should add random ids to elements", () => {
    let count = 0;
    const tpl = `
        <div>
            <span>hello</span>
            <div name="john"></div>
            <row>
                <dummy/>
                <dummy2 name="peter"/>
            </row>
        </div>`;
    const tplWithIds = `
        <div id="div-one">
            <span id="span-two">hello</span>
            <div name="john" id="div-three"></div>
            <row id="row-four">
                <dummy id="dummy-five"/>
                <dummy2 name="peter" id="dummy2-six"/>
            </row>
        </div>`;

    const idGenerator = () => {
      const ids = ["one", "two", "three", "four", "five", "six"];
      const id = ids[count];
      count += 1;
      return id;
    };
    const templateStr = artist.addElementID(tpl, idGenerator);
    expect(templateStr).toEqual(tplWithIds);
  });
  it("should not add id if it already exists", () => {
    let count = 0;
    const tpl = `
        <div id="one">
            <span id="two">hello</span>
            <div name="john"></div>
            <row>
                <dummy/>
                <dummy2 name="peter"/>
            </row>
        </div>`;
    const tplWithIds = `
        <div id="one">
            <span id="two">hello</span>
            <div name="john" id="div-three"></div>
            <row id="row-four">
                <dummy id="dummy-five"/>
                <dummy2 name="peter" id="dummy2-six"/>
            </row>
        </div>`;

    const idGenerator = () => {
      const ids = ["three", "four", "five", "six"];
      const id = ids[count];
      count += 1;
      return id;
    };
    const templateStr = artist.addElementID(tpl, idGenerator);
    expect(templateStr).toEqual(tplWithIds);
  });
  it("should get element store", () => {
    artist.createStore({
      month: { name: "march" },
    });
    expect(
      artist.getElementStore({ attributes: [{ key: "id", value: "month" }] }),
    ).toEqual({ name: "march" });
  });
  it("should minify the template", () => {
    const tpl = `<div id="one">
            <span id="two">hello</span>
            <div name="john"> content </div>
            <div></div>
        </div>`;
    const minifiedTpl =
      '<div id="one"><span id="two">hello</span><div name="john">content</div><div></div></div>';
    expect(artist.minifyTpl(tpl)).toEqual(minifiedTpl);
  });
  it("should compile the template", () => {
    const tpl = `<div id="one">
            <span id="two">{{name}}</span>
            <div name="john"> {{content}} </div>
            <div></div>`;
    artist.createStore({
      name: "vylson",
      content: "hello",
    });
    const expected = `<div id="one">
            <span id="two">vylson</span>
            <div name="john"> hello </div>
            <div></div>`;
    expect(artist.compileTpl(tpl)).toEqual(expected);
  });
  it.skip("should pass only sliced store to element", () => {});
  it.skip("should update display text on store change", () => {});
  it.skip("should dispose all timers", () => {});
  it.skip("should recursively load elements", () => {});
  it.skip("should update the template with store data", () => {});
  it.skip("should parse the templates to object", () => {});
  it.skip("should register new elements", () => {});
  it.skip("should get changed store elements", () => {});
});
