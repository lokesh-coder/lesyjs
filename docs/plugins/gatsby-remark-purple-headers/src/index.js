const visit = require("unist-util-visit");
module.exports = () => (tree, file) => {
  visit(tree, "text", node => {
    console.log("node=====......======>", node, "\n");

    if (textNode.value.includes(":icon-")) {
      let value = child.value.replace(
        /:icon-([a-z-]+)\s*/gim,
        "<i class='$1'></i>",
      );
      //   console.log("node", textNode, "\n");
      textNode.value = value;
      textNode.type = `html`;
    }
  });
};
