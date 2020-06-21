const pageConfig = require("../config/doc-pages-config");

function createDocNodes({ node, getNode, actions: { createNodeField } }) {
  if (node.internal.type !== `Mdx`) return;

  const parentNode = getNode(node.parent);
  const { relativePath, relativeDirectory, ext } = parentNode;

  let value = relativePath.replace(ext, "");
  value = value === "index" ? "" : value;
  let screenName = relativePath.split("/")[0];
  let sectionName = "";
  if (relativeDirectory.split("/").length == 2) {
    sectionName = pageConfig.pageSectionNames[relativeDirectory.split("/")[1]];
  }

  createNodeField({
    name: `section`,
    node,
    value: sectionName,
  });

  createNodeField({
    name: `screen`,
    node,
    value: screenName,
  });

  createNodeField({
    name: `slug`,
    node,
    value: `/${value}`,
  });

  createNodeField({
    name: "id",
    node,
    value: node.id,
  });

  createNodeField({
    name: "title",
    node,
    value: node.frontmatter.title || startCase(parent.name),
  });
}

exports.createDocNodes = createDocNodes;
