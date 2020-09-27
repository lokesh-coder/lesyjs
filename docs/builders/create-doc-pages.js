const { createDocPage } = require("./create-doc-page");

function createDocPages(pageTools) {
  const { graphql, actions, reporter } = pageTools;
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: `/docs/core/even-more`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/docs/dev/performance`,
  });

  const allDocs = [];
  ["main", "dev", "plugins", "developer"].forEach((name) => {
    allDocs.push(createDocPage(createPage, graphql, reporter, name));
  });
  return Promise.all(allDocs);
}

exports.createDocPages = createDocPages;
