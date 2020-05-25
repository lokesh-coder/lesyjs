import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";

describe("@lesy/lesy-plugin-help", () => {
  let testBed;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: resolve(__dirname, "../"),
      commands: [
        resolve(__dirname, "../src/help.command.ts"),
        {
          name: "hello",
          description: "this is hello desc",
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
          name: "default",
          description: "this is a dummy description",
          run: () => {
            console.log("in default command");
          },
        },
      ],
      middlewares: [resolve(__dirname, "../src/help.middleware.ts")],
      features: [resolve(__dirname, "./fixtures/help.feature.ts")],
      config: {
        defaultCmd: "default",
      },
    });
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
    expect(response).toContain(`All Commands`);
    expect(response).toContain(`testapp hello [name]`);
  });
});
