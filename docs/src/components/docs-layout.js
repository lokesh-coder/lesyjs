import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../styles/doc.scss";

export default function PageTemplate({
  data: { mdx, allMdx, githubData },
  pageContext,
  location,
}) {
  if (pageContext.next && pageContext.next.frontmatter.skip) {
    pageContext.next = pageContext.allPages[pageContext.ind + 2].node;
  }

  if (pageContext.prev && pageContext.prev.frontmatter.skip) {
    pageContext.prev = pageContext.allPages[pageContext.ind - 2].node;
  }

  return (
    <Layout content={mdx} allContent={pageContext.allPages}>
      <SEO title="Home" />

      <MDXRenderer github={githubData}>{mdx.body}</MDXRenderer>
      <div
        className={`page-nav--container ${pageContext.prev ? "" : "isFirst"} ${
          pageContext.next ? "" : "isLast"
        } `}
      >
        {pageContext.prev && (
          <Link
            to={pageContext.prev.frontmatter.path}
            className="page-nav__link first"
          >
            <i class="ri-arrow-left-line"></i>
            <div className="page-nav prev">
              <span>Previous</span>
              <span>{pageContext.prev.fields.title}</span>
            </div>
          </Link>
        )}

        {pageContext.jumpSection && (
          <Link
            to={pageContext.jumpSection.frontmatter.path}
            className="page-nav__link last"
          >
            <div className="page-nav divert">
              <span>Jump to</span>
              <span>{pageContext.jumpSection.fields.title}</span>
            </div>
            <i class="ri-guide-line"></i>
          </Link>
        )}

        {pageContext.next && (
          <Link
            to={pageContext.next.frontmatter.path}
            className="page-nav__link last"
          >
            <div className="page-nav next">
              <span>Next</span>
              <span>{pageContext.next.fields.title}</span>
            </div>
            <i class="ri-arrow-right-line"></i>
          </Link>
        )}
      </div>
    </Layout>
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
