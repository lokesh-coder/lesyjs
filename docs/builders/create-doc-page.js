const menuLinks = require("../config/doc-pages-config");
const path = require("path");

async function createDocPage(createPage, graphql, reporter, screenName) {
  const result = await graphql(`
    query {
      allMdx(filter: {fileAbsolutePath: {glob: "**/docs/${screenName}/**"}}) {
        edges {
          node {
            toc: tableOfContents(maxDepth: 4)
            parent {
              ... on File {
                fileName: relativePath
                relativeDirectory
              }
            }
            frontmatter {
              title
              path
              icon
              skip
            }
            fields {
              id
              slug
              title
              screen
              section
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  let pages = result.data.allMdx.edges;
  let finalPageEdges = [];
  let pageOrderMap = {};
  menuLinks[`${screenName}ScreenMenuLinks`].forEach(
    (page, index) => (pageOrderMap[page] = index),
  );

  pages.forEach((page) => {
    if (pageOrderMap[page.node.parent.fileName] !== false) {
      console.log("**", pageOrderMap, page.node.parent.fileName);
      finalPageEdges[pageOrderMap[page.node.parent.fileName]] = page;
    }
  });

  finalPageEdges.forEach(({ node }, index) => {
    const context = {
      id: node.fields.id,
      ind: index,
      prev: index === 0 ? null : finalPageEdges[index - 1].node,
      next:
        index === finalPageEdges.length - 1
          ? null
          : finalPageEdges[index + 1].node,
      allPages: finalPageEdges,
    };
    if (context.next && context.next.frontmatter.skip) {
      context.jumpSection = context.next;
    }
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./templates/docs-template.js`),
      context,
    });
  });
}

module.exports = {
  createDocPage,
};
