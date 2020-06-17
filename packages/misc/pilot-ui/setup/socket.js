const config = require("./config-store");
let argh = require("argh");

let values = process.argv.slice(2);
argh = argh(values[1].split(" "));

if (argh.sport) {
  config.set("sport", argh.sport);
  console.log("using sport from cache");
}

if (argh.shost) {
  config.set("shost", argh.shost);
  console.log("using shost from cache");
}

if (!argh.sport && !config.has("sport")) {
  throw new Error("Please specify --sport");
}

if (!argh.shost && !config.has("shost")) {
  throw new Error("Please specify --shost");
}
