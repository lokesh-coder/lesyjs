const path = require("path");
export default {
  on: "INIT",
  run(data: any) {
    const newData = { ...data };
    const localConfig = data.config;
    Object.defineProperty(data, "config", {
      set(value) {
        newData.config = value;
      },
      get() {
        const { rcFile } = require("rc-config-loader");
        const pluginConfig = localConfig["@lesy/lesy-plugin-config"];
        const name =
          (pluginConfig && pluginConfig.name) || path.parse(newData.root).name;

        const { config: c = {} } =
          rcFile(name, {
            cwd: newData.root,
            configFileName: `${newData.root}/${name}`,
            defaultExtension: [".json", ".yml", ".js"],
            packageJSON: {
              fieldName: name,
            },
          }) || {};
        return { ...c, ...localConfig };
      },
    });
    return newData;
  },
};
