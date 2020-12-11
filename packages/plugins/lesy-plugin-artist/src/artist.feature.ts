export default function (feature: any) {
  feature.artist = () => {
    const artistClass = require("@lesy/artist").default;
    const artist = new artistClass();
    return { ui: artist };
  };
}
