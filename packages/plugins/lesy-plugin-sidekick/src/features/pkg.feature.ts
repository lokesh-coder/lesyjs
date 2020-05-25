export default function(feature, root) {
  if (feature.pkg) return;
  Object.defineProperty(feature, "pkg", {
    get: () => {
      let pkg;
      try {
        pkg = require(`${root}/package.json`);
      } catch (e) {
        pkg = {};
      }
      return pkg;
    },
  });
}
