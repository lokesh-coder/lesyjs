import { graphql } from "gatsby";
import React from "react";
import DocLayout from "../layouts/doc.layout";

export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        summary
        icon
      }
      tableOfContents(maxDepth: 3)
      body
    }
    githubData {
      github: data {
        repository {
          releases {
            edges {
              node {
                descriptionHTML
              }
            }
          }
        }
      }
    }
  }
`;

const DocTemplate = props => {
  const { frontmatter, tableOfContents, body: content } = props.data.mdx;
  const { prev, next, sidebarItems, section, parent } = props.pageContext;
  const releases = props.data.githubData.github.repository.releases.edges;

  const layoutProps = {
    data: { ...frontmatter, content },
    tocItems: tableOfContents.items,
    activePageSection: section,
    nav: { prev, next, parent },
    parent: parent.path,
    sidebarItems,
    releases,
  };

  return <DocLayout {...layoutProps} />;
};

export default DocTemplate;
