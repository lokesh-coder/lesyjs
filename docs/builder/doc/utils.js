const groupBy = require("lodash/groupBy");

const addPageNav = pages => {
  return pages.map((page, index) => {
    return { ...page, prev: pages[index - 1], next: pages[index + 1] };
  });
};
const iteratePages = routes => {
  const pages = [];
  Object.keys(routes).forEach(parentPath => {
    const parent = routes[parentPath];
    Object.keys(parent).forEach(sectionPath => {
      const section = parent[sectionPath];
      section.children.forEach(({ path: childPath, label }) => {
        const page = {
          slug: [parentPath, sectionPath, childPath].join("/"),
          parent: { path: parentPath },
          section: { name: section.label, data: section.ctx },
          name: label,
        };
        pages.push(page);
      });
    });
  });
  return addPageNav(pages);
};

const getAlgoliaQueries = () => {
  const query = `
  {
   posts: allMdx(
    filter: { fileAbsolutePath: { regex: "/content/docs/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          summary
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
  }
`;
  const settings = { attributesToSnippet: [`excerpt:20`] };
  return [
    {
      query,
      transformer: ({ data }) =>
        data.posts.edges.map(({ node: { frontmatter, ...rest } }) => {
          return {
            ...frontmatter,
            ...rest,
          };
        }),
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      settings,
    },
  ];
};

const getGithubGraphQL = () => {
  return `
    query {
			repository(name: "lesyjs", owner: "lokesh-coder") {
				id
				forkCount
				issues {
					totalCount
				}
				stargazers {
					totalCount
				}
				collaborators(first: 100) {
					edges {
						node {
							id
							url
							avatarUrl
						}
					}
				}
				updatedAt
				releases(first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
					edges {
						node {
							id
							author {
								id
							}
							descriptionHTML
						}
					}
				}
			}
    }`;
};

const sidebarMenuItems = pages => {
  const groups = groupBy(pages, p => p.parent.path);
  return groups;
};

module.exports = {
  iteratePages,
  getAlgoliaQueries,
  sidebarMenuItems,
  getGithubGraphQL,
};
