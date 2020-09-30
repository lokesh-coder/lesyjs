const { createDocNodes, createDocPages } = require("./builders");

exports.createPages = (pageTools) => {
  return createDocPages(pageTools);
};

exports.onCreateNode = (nodeTools) => {
  createDocNodes(nodeTools);
};
