import configMw from "../src/middlewares/config.mw";

describe("lesy-plugin-config", () => {
  it("should load config from file", () => {
    const data = configMw.run({
      root: __dirname,
      config: {
        "@lesy/lesy-plugin-config": {
          name: "test-config",
        },
      },
    });
    expect(data.config).toHaveProperty("name", "dummy-config-value-from-file");
  });
});
