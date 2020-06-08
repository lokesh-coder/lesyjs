export default {
  on: "PRE_PARSE",
  run: (data: any) => {
    const pluginConfig = data.config["@lesy/lesy-plugin-store"];
    if (pluginConfig && data.argv[0] === pluginConfig.name) {
      data.argv[0] = "store";
    }
    return data;
  },
};
