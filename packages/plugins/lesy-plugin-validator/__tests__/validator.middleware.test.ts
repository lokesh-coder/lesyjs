import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";

describe("@lesy/lesy-plugin-validator", () => {
  let testBed;
  let mockExit;
  beforeEach(() => {
    testBed = new LesyTestBed({
      isTypescriptApp: true,
      loadDefaultPlugins: false,
      root: resolve(__dirname, "../"),
      commands: [
        {
          name: "hello",
          args: {
            name: {
              required: true,
              requiredError: "name is mandatory",
            },
          },
          run: ({ args }) => {
            console.log(`Hello ${args.name}`);
          },
        },
        {
          name: "sayname",
          args: {
            name: {},
          },
          run: ({ args }) => {
            console.log(`Hi ${args.name || "Stranger"}`);
          },
        },
      ],
      middlewares: [resolve(__dirname, "../src/validator.middleware.ts")],
    });

    mockExit = jest
      .spyOn(process, "exit")
      .mockImplementationOnce((() => {}) as never);
  });
  afterEach(() => {
    mockExit.mockRestore();
    mockExit.mockReset();
  });
  it("should throw error when prompt plugin is missing", async () => {
    const response = await testBed.run(["hello"]);
    expect(response).toContain(
      "@lesy/lesy-plugin-prompt plugin is missing. Please install and add it to plugins array",
    );
    expect(response).toContain("name is mandatory");
  });

  it("should prompt and update args", async () => {
    testBed.data.features = [
      (f) => {
        f.prompt = () => ({ name: "yogo" });
      },
    ];
    const response = await testBed.run(["hello"]);
    expect(response).toContain("Hello yogo");
  });

  it("should not prompt for non required aargs", async () => {
    const response = await testBed.run(["sayname"]);
    expect(response).toContain("Hi Stranger");
  });
});
