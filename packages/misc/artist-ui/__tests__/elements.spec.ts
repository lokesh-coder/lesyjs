import cliSpinners from "cli-spinners";
// tslint:disable-next-line: import-name
import Artist from "../src";

const stripAnsiColors = (str: any) => str.replace(/\u001b\[.*?m/g, "");

describe("artist elements", () => {
  let artist: Artist;
  let output: any;
  const chalkMock = (data: any) => {
    Object.setPrototypeOf(chalkMock, {
      green: (data: any) => data,
      dim: (data: any) => data,
    });
    return data;
  };

  beforeEach(() => {
    artist = new Artist();
    artist.rewriteScreen = jest.fn().mockImplementation((input) => {
      output = input;
    });
  });

  it("should render the box", () => {
    const box = `
┌─────┐
│hello│
└─────┘
`;
    artist.render(() => "<box>hello</box>");
    expect(output).toEqual(box.trim());
  });

  it("should render the text", () => {
    const text = `hello`;
    artist.render(() => "<text>hello</text>");
    expect(output).toEqual(text);
  });

  it("should render the div", () => {
    const block = `\nhello\n`;
    artist.render(() => "<div>hello</div>");
    expect(output).toEqual(block);
  });
  it("should render the span", () => {
    const inline = `hello`;
    artist.render(() => "<span>hello</span>");
    expect(output).toEqual(inline);
  });

  it("should render the newline", () => {
    const newline = `\n`;
    artist.render(() => "<newline/>");
    expect(output).toEqual(newline);
  });

  it("should render the progress", () => {
    const progress = "[▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░]";
    artist.render(() => "<progress score='10'/>");
    expect(stripAnsiColors(output)).toEqual(progress.toString());
  });

  it("should render the unknown", () => {
    const unknown = "Element dummy is unknown";
    artist.render(() => "<dummy></dummy>");
    expect(output).toEqual(unknown);
  });

  it("should render the spinner", (done) => {
    setTimeout(() => {
      artist.clearAllTimers();
      done();
      expect(cliSpinners.dots.frames.includes(output.trim())).toBeTruthy();
    }, 100);

    artist.render(() => "<spinner/>");
  });

  it("should render the row when no column is defined", () => {
    const row = "";
    artist.render(() => "<row>hello</row>");
    expect(output).toEqual(row);
  });

  it("should render the row when columns are defined", () => {
    artist.render(
      () => `
    <row>
        <column>Name</column>
        <column>Kevin</column>
    </row>
    `,
    );
    expect(/Name(\s+)Kevin/.test(output)).toBeTruthy();
  });

  it("should render the column", () => {
    artist.render(() => "<column>hello</column>");
    expect(output).toEqual("hello::");
  });

  it("should render the space", () => {
    artist.render(() => "<space length='5'/>");
    expect(output).toEqual(" ".repeat(5));
  });

  it("should render the list", () => {
    const names = ["Peter", "Kevin", "John"];
    artist.render(
      () => `${names.map((name: string) => `<text>${name}</text>`).join("-")}`,
    );
    expect(output).toEqual("Peter-Kevin-John");
  });
});
