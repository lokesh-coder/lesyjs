import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";
// tslint:disable-next-line: import-name
import PluginData from "../src";

describe("@lesy/lesy-plugin-help", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: resolve(__dirname, "../"),

      commands: [
        ...PluginData.commands,
        {
          name: "hello",
          description: "this is hello desc",
          additionalInfo: "some footer msg",
          usage: "--foo--",
          args: {
            name: {
              description: "user name",
            },
          },
          flags: {
            yoyo: {
              description: "dummy flag desc",
            },
          },
          run: () => {
            console.log("hello..");
          },
        },
        {
          name: "minimal",
          main: "hello",
          run: () => {
            console.log("hello..");
          },
        },
        {
          name: "minimal2",
          aliases: ["m2", "mm"],
          args: {
            city: {
              required: true,
              description: "city name",
            },
          },
          main: "hello",
          run: () => {
            console.log("hello..");
          },
        },
        {
          name: "default",
          description: "this is a dummy description",
          run: () => {
            console.log("in default command");
          },
        },
      ],
      middlewares: [...PluginData.middlewares],
      features: [resolve(__dirname, "./fixtures/help.feature.ts")],
      config: {
        defaultCmd: "default",
      },
    });
  });

  it("should render description", async () => {
    const response = await testBed.run(["hello", "--help"]);
    expect(response).toContain("this is hello desc");
  });

  it("should render properly with flag", async () => {
    const response = await testBed.run(["hello", "--help"]);
    expect(response).toContain("testapp hello [name]");
  });

  it("should render properly with command", async () => {
    const response = await testBed.run(["help", "hello"]);
    expect(response).toContain("testapp hello [name]");
  });

  it("should render properly when no args passes", async () => {
    const response = await testBed.run(["help"]);
    expect(response).toContain(`Commands`);
    expect(response).toContain(`testapp hello [name]`);
  });

  it("should render additional info", async () => {
    const response = await testBed.run(["hello", "--help"]);
    expect(response).toContain(`some footer msg`);
  });

  it("should render sub commands", async () => {
    const response = await testBed.run(["hello", "--help"]);
    expect(response).toContain(`Sub commands`);
    expect(response).toContain(`testapp hello minimal`);
  });

  it("should not render args", async () => {
    const response = await testBed.run(["hello", "minimal", "--help"]);
    expect(response).not.toContain(`Arguments`);
    expect(response).toContain(`testapp hello minimal`);
  });

  it("should render sub command args", async () => {
    const response = await testBed.run(["hello", "minimal2", "--help"]);
    expect(response).toContain(`testapp hello minimal2 [city]`);
    expect(response).toContain(`Arguments`);
    expect(response).toContain(`- city name *`);
  });

  it("should render aliases", async () => {
    const response = await testBed.run(["hello", "minimal2", "--help"]);
    expect(response).toContain(`Aliases`);
    expect(response).toContain("minimal2, m2, mm");
  });
});
