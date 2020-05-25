if (!process.env.GH_TOKEN) {
  require("dotenv").config();
}

module.exports = {
  siteMetadata: {
    title: `Lesy | CLI framework | Documentatio`,
    description: `Lesy CLI Framework`,
    author: `Lokesh Rajendran`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
          },
          "gatsby-remark-autolink-headers",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
        ],
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lesy | CLI framework | Documentation`,
        short_name: `Lesy doc`,
        start_url: `/`,
        background_color: `#d5695f`,
        theme_color: `#d5695f`,
        display: `minimal-ui`,
        icon: `src/images/lesy-head.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-sass",
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "IBM Plex Mono",
            variants: ["400", "500", "600", "700"],
          },
          {
            family: "Hind Siliguri",
            variants: ["300", "400", "500", "600", "700"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: process.env.GH_TOKEN,

        graphQLQuery: `
        query {
          repository(name: "lesy", owner: "lokesh-coder") {
            id
            forkCount
            issues {
            totalCount
          }
        stargazers(first: 100) {
        edges {
            node{
            name
            login
            avatarUrl
            }
        }
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
        releases(first: 100, orderBy: {field: CREATED_AT,direction:DESC}) {
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
        }
        `,
      },
    },
    // {
    //   resolves: "gatsby-plugin-breadcrumb",
    //   options: {
    //     defaultCrumb: {
    //       location: {
    //         state: { crumbClicked: false },
    //         pathname: "/",
    //       },
    //       crumbLabel: "HomeCustom",
    //       crumbSeparator: " / ",
    //       crumbStyle: { color: "#666" },
    //       crumbActiveStyle: { color: "orange" },
    //     },
    //     useClassNames: true,
    //   },
    // },
  ],
};
