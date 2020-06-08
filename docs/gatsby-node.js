const screen = require("./construct-pages/base");
const page = require("./config/page-order");
exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: `/core/even-more`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/dev/performance`,
  });

  let screenOne = screen.createBaseScreen(
    createPage,
    graphql,
    reporter,
    "main",
  );
  let screenTwo = screen.createBaseScreen(createPage, graphql, reporter, "dev");
  let screenThree = screen.createBaseScreen(
    createPage,
    graphql,
    reporter,
    "plugins",
  );
  return Promise.all([screenTwo, screenOne, screenThree]);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    let value = parent.relativePath.replace(parent.ext, "");
    let screenName = "";
    if (parent.relativePath.split(":").length == 2) {
      screenName = parent.relativePath.split("/")[0].split(":")[1];
    }
    let sectionName = "";
    if (parent.relativeDirectory.split("/").length == 2) {
      sectionName =
        page.pageSectionNames[parent.relativeDirectory.split("/")[1]];
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

    if (value === "index") {
      value = "";
    }

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
};
