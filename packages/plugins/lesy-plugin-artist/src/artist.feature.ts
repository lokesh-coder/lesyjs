export default function (feature: any, root: any, utils: any) {
  feature.artist = (config) => {
    feature.artistInstanceId = Date.now();
    const artistClass = require("@lesy/artist").default;
    const artist = new artistClass(utils.color());
    feature.artistDispose = artist.clearTimers.bind(artist);
    const pluginConfig = config["@lesy/lesy-plugin-artist"];
    if (pluginConfig?.plugins) {
      let elements = {};
      pluginConfig.plugins.forEach((plugin) => {
        elements = { ...elements, ...plugin.module.elements };
      });
      artist.registerElements(elements);
    }

    return { ui: artist };
  };
}
