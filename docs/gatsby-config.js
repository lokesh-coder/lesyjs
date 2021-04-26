if (process.env.NODE_ENV !== `production`) require("dotenv").config();
const { getAlgoliaQueries, getGithubGraphQL } = require("./builder/doc/utils");

const version = require("./package.json").version;
const tailwindConfig = require("./tailwind.config.js");

const siteMetadata = {
  siteUrl: "https://lesyjs.io",
  name: "Lesy CLI framework",
  description:
    "Build modern and advanced CLI apps for multiple platforms without much boilerplate",
  short_name: "Lesy CLI framework",
  start_url: "/",
  background_color: "#d5695f",
  theme_color: "#d5695f",
  display: "minimal-ui",
  icon: "src/images/lesy-head.png",
  author: "Lokesh rajendran",
  version,
};

const filesystemDocOptions = {
  name: `documentation`,
  path: `${__dirname}/src/content`,
};

const filesystemImgOptions = {
  name: `images`,
  path: `${__dirname}/src/images`,
};

const remarkImagesOptions = {
  maxWidth: 590,
  sizeByPixelDensity: true,
  linkImagesToOriginal: false,
};

const remarkPrismjsOptions = {
  showLineNumbers: false,
  prompt: {
    user: "root",
    host: "localhost",
    global: false,
  },
  aliases: { sh: "bash" },
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

const mailchimpOptions = {
  endpoint: process.env.MAILCHIMP_ENDPOINT,
};

const postcssOptions = {
  postCssPlugins: [
    require(`tailwindcss`)(tailwindConfig),
    require(`autoprefixer`),
    ...(process.env.NODE_ENV === `production` ? [require(`cssnano`)] : []),
  ],
};

const manifestOptions = {
  name: `Lesy CLI Framework`,
  short_name: `Lesy`,
  start_url: `/`,
  background_color: `#d5695f`,
  theme_color: `#d5695f`,
  display: `standalone`,
  icon: `static/images/logo.png`,
};

const algoliaOptions = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries: getAlgoliaQueries(),
  chunkSize: 10000,
};
const githubAPIOptions = {
  token: process.env.GH_TOKEN,
  graphQLQuery: getGithubGraphQL(),
};

const googleAnalyticsOptions = {
  trackingId: "G-EB0CVWTKXY",
};

module.exports = {
  siteMetadata,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-remark-copy-linked-files",
    "gatsby-plugin-offline",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: googleAnalyticsOptions,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: filesystemDocOptions,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: filesystemImgOptions,
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
      resolve: "gatsby-plugin-mailchimp",
      options: mailchimpOptions,
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: postcssOptions,
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: algoliaOptions,
    },
    {
      resolve: "gatsby-source-github-api",
      options: githubAPIOptions,
    },
  ],
};
