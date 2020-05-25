import { LesyTestBed } from "@lesy/testbed";
import { resolve } from "path";
import configstore from "configstore";
// tslint:disable-next-line: import-name
import PluginData from "../src";

(PluginData["features"] as any).push(
  (f: any) => (f.pkg = { name: "test_key" }),
);

describe("@lesy/lesy-plugin-store", () => {
  describe("Commands", () => {
    let testBed;
    let store;
    beforeEach(() => {
      testBed = new LesyTestBed({
        isTypescriptApp: true,
        loadDefaultPlugins: false,
        root: resolve(__dirname, "../"),
        ...PluginData,
      });
      store = new configstore("test_key");
    });
    afterEach(() => {
      store.clear();
    });
    fit("should show no keys found if no keys exist", async () => {
      const response = await testBed.run(["store"]);
      expect(response).toContain("No keys found");
    });
    it("should show all stored keys", async () => {
      store.set({
        my_super_key: "my_awesome_val",
        my_dummy_key: "my_dummy_val",
      });
      const response = await testBed.run(["store"]);
      expect(response).toContain("my_super_key => my_awesome_val");
      expect(response).toContain("my_dummy_key => my_dummy_val");
    });

    it("should set new key", async () => {
      await testBed.run(["store", "set", "abc", "xyz"]);
      expect(store.get("abc")).toEqual("xyz");
    });

    it("should show success message on setting new key", async () => {
      const response = await testBed.run(["store", "set", "one", "two"]);
      expect(response).toContain("success: set two to one");
    });

    it("should display value of a key", async () => {
      store.set("James", "Bond");
      const response = await testBed.run(["store", "get", "James"]);
      expect(response).toContain("value for James: Bond");
    });

    it("should remove key", async () => {
      store.set("James", "Bond");
      const response = await testBed.run(["store", "remove", "James"]);
      expect(response).toContain("Key James is deleted");
    });
  });

  describe("Middleware", () => {
    let testBed;
    beforeEach(() => {
      testBed = new LesyTestBed({
        isTypescriptApp: true,
        loadDefaultPlugins: false,
        root: resolve(__dirname, "../"),
        ...PluginData,
        config: {
          "@lesy/lesy-plugin-store": {
            name: "conf",
          },
        },
      });
    });

    it("should able to set custom command name", async () => {
      const response = await testBed.run(["conf"]);
      expect(response).toContain("No keys found!");
    });
  });
});
