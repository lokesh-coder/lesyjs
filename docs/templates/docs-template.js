import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import DocsLayout from "../src/components/layouts/docs-layout";
import SEO from "../src/components/seo";
import "../src/styles/doc.scss";
import FooterNav from "../src/components/docs/footer-nav";

export default function PageTemplate({
  data: { mdx, allMdx, githubData },
  pageContext,
  location,
}) {
  return (
    <DocsLayout content={mdx} allContent={pageContext.allPages}>
      <SEO title={mdx.frontmatter.seoTitle || "Home"} />

      <MDXRenderer github={githubData}>{mdx.body}</MDXRenderer>
      <FooterNav
        prevPage={pageContext.prev}
        nextPage={pageContext.next}
        jumpPage={pageContext.jumpSection}
        allPages={pageContext.allPages}
        index={pageContext.ind}
      />
    </DocsLayout>
  );
}

export const pageQuery = graphql`
  query($id: String) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      toc: tableOfContents(maxDepth: 4)
      parent {
        ... on File {
          relativePath
          relativeDirectory
        }
      }
      frontmatter {
        title
        path
        icon
        npm
        repo
        seoTitle
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
          toc: tableOfContents(maxDepth: 4)
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
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
