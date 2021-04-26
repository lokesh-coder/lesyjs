const { routes, redirected } = require("../../lesy-routes");
const { iteratePages, sidebarMenuItems } = require("./utils");

exports.createPages = async ({ actions }) => {
  const { createRedirect, createPage } = actions;

  const pages = iteratePages(routes);
  const sidebarItems = sidebarMenuItems(pages);

  pages.forEach(page => {
    createPage({
      component: require.resolve("../../src/templates/doc.template.js"),
      path: page.slug,
      context: { ...page, sidebarItems: sidebarItems[page.parent.path] },
    });
  });

  redirected.forEach(({ from, to }) => {
    createRedirect({
      fromPath: from,
      toPath: to,
      isPermanent: true,
      redirectInBrowser: true,
    });
  });
};
