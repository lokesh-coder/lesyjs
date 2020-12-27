import cliSpinners from "cli-spinners";
// tslint:disable-next-line: import-name
import Artist from "../src";

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
    artist = new Artist(chalkMock);
    artist.createStore({});
    artist.updateDisplay = jest.fn().mockImplementation((input) => {
      output = input;
    });
    artist.registerElements({
      getid: (_, ctx) => {
        const props = ctx.getProps({});
        return props.id;
      },
    });
  });

  it("should render the box", () => {
    const box = `
┌─────┐
│hello│
└─────┘
`;
    artist.paint("<box>hello</box>");
    expect(output).toEqual(box.trim());
  });

  it("should render the text", () => {
    const text = `hello`;
    artist.paint("<text>hello</text>");
    expect(output).toEqual(text);
  });

  it("should render the div", () => {
    const block = `\nhello\n`;
    artist.paint("<div>hello</div>");
    expect(output).toEqual(block);
  });
  it("should render the span", () => {
    const inline = `hello`;
    artist.paint("<span>hello</span>");
    expect(output).toEqual(inline);
  });

  it("should render the key", () => {
    const key = `hello`;
    artist.paint("<key index='22'><getid id='one'></getid></key>");
    expect(output).toEqual("one-22");
  });

  it("should render the newline", () => {
    const newline = `\n`;
    artist.paint("<newline></newline>");
    expect(output).toEqual(newline);
  });

  it("should render the progress", () => {
    const progress = "[▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░]";
    artist.paint("<progress score='10'></progress>");
    expect(output).toEqual(progress);
  });

  it("should render the unknown", () => {
    const unknown = "UNKNOWN ERROR:dummy is not defined!";
    artist.paint("<dummy></dummy>");
    expect(output).toEqual(unknown);
  });

  it("should render the spinner", (done) => {
    setTimeout(() => {
      artist.clearTimers();
      done();
      expect(cliSpinners.dots.frames.includes(output.trim())).toBeTruthy();
    }, 100);

    artist.paint("<spinner></spinner>");
  });
});
