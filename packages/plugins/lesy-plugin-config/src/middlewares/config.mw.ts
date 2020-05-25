const path = require("path");
export default {
  on: "INIT",
  run(data: any) {
    const localConfig = data.config;
    Object.defineProperty(data, "config", {
      get() {
        const { rcFile } = require("rc-config-loader");
        const pluginConfig = localConfig["@lesy/lesy-plugin-config"];
        const name =
          (pluginConfig && pluginConfig.name) || path.parse(data.root).name;

        const { config: c = {} } =
          rcFile(name, {
            cwd: data.root,
            configFileName: `${data.root}/${name}`,
            defaultExtension: [".json", ".yml", ".js"],
            packageJSON: {
              fieldName: name,
            },
          }) || {};
        return { ...c, ...localConfig };
      },
    });
    return data;
  },
};
