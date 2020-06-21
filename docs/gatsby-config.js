if (!process.env.GH_TOKEN) {
  require("dotenv").config();
}
const version = require("./package.json").version;
const tailwindConfig = require("./tailwind.config.js");

const siteMetadata = {
  title: "Lesy | CLI framework | Documentation",
  description: "Lesy CLI Framework",
  author: "Lokesh Rajendran",
  version,
};

const sourceFilesystemOptions = {
  name: "docs",
  path: `${__dirname}/src/markdown/docs`,
};

const remarkImagesOptions = {
  maxWidth: 1035,
  sizeByPixelDensity: true,
};

const remarkPrismjsOptions = {
  showLineNumbers: true,
};

const remarkPlugins = [
  "gatsby-remark-autolink-headers",
  {
    resolve: "gatsby-remark-images",
    options: remarkImagesOptions,
  },
  {
    resolve: "gatsby-remark-prismjs",
    options: remarkPrismjsOptions,
  },
];

const mdxOptions = {
  extensions: [".mdx", ".md"],
  gatsbyRemarkPlugins: remarkPlugins,
};

const manifestOptions = {
  name: "Lesy | CLI framework | Documentation",
  short_name: "Lesy doc",
  start_url: "/",
  background_color: "#d5695f",
  theme_color: "#d5695f",
  display: "minimal-ui",
  icon: "src/images/lesy-head.png",
};

const postcssOptions = {
  postCssPlugins: [
    require(`tailwindcss`)(tailwindConfig),
    require(`autoprefixer`),
    ...(process.env.NODE_ENV === `production` ? [require(`cssnano`)] : []),
  ],
};

const githubAPIOptions = {
  token: process.env.GH_TOKEN,
  graphQLQuery: `
    query {
			repository(name: "lesyjs", owner: "lokesh-coder") {
				id
				forkCount
				issues {
					totalCount
				}
				stargazers(first: 100) {
					edges {
						node {
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
    }`,
};

module.exports = {
  siteMetadata,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-remark-copy-linked-files",
    "gatsby-plugin-offline",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-filesystem`,
      options: sourceFilesystemOptions,
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: mdxOptions,
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: manifestOptions,
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: postcssOptions,
    },
    {
      resolve: "gatsby-source-github-api",
      options: githubAPIOptions,
    },
  ],
};
