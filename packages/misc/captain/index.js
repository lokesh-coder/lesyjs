function pilot() {
  const lesy = require("@lesy/compiler");
  const path = require("path");

  return lesy({
    root: path.resolve(__dirname, "./"),
    commands: [{ run: () => console.log("hello") }],
    plugins: ["@lesy/lesy-plugin-pilot"],
  }).parse(["pilot"]);
}

module.exports = pilot;
