const { createDocNodes, createDocPages } = require("./builders");

console.log({ createDocPages });

exports.createPages = (pageTools) => {
  createDocPages(pageTools);
};

exports.onCreateNode = (nodeTools) => {
  createDocNodes(nodeTools);
};
