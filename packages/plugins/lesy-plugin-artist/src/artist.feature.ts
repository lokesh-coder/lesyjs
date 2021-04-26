export default function (feature: any, root: any, utils: any) {
  feature.artist = (config) => {
    feature.artistInstanceId = Date.now();
    const artistClass = require("@lesy/artist").default;
    const pluginConfig = config["@lesy/lesy-plugin-artist"];
    const artist = new artistClass(pluginConfig);

    if (pluginConfig?.plugins) {
      let elements = {};
      pluginConfig.plugins.forEach((plugin) => {
        elements = { ...elements, ...plugin.module.elements };
      });
      artist.registerEls(elements);
    }
    feature.artistInstance = artist;
    return { ui: artist };
  };
}
