export default function store(feature) {
  Object.defineProperty(feature, "store", {
    get: () => {
      const configstore = require("configstore");
      return new configstore(feature.pkg.name, {});
    },
  });
}
