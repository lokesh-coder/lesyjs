const { createDocNodes, createDocPages } = require("./builders");

exports.createPages = (pageTools) => {
  createDocPages(pageTools);
};

exports.onCreateNode = (nodeTools) => {
  createDocNodes(nodeTools);
};
