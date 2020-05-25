const webpack = require("webpack");

const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./src/**/*.html", "./src/**/*.component.ts"],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

let socketData = require("./setup/config-store");

module.exports = (config, options) => {
  console.log(`Using '${config.mode}' mode`);
  config.module.rules.push({
    test: /tailwind\.scss$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          plugins: [
            require("tailwindcss")("./tailwind.config.js"),
            require("autoprefixer"),
            ...(config.mode === "production" ? [purgecss] : []),
          ],
        },
      },
    ],
  });
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        socketHost: JSON.stringify(socketData.get("shost")),
        socketPort: JSON.stringify(socketData.get("sport")),
      },
    }),
  );
  return config;
};
