const appConfig = require("../../lesy-config.json");
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    "type Mdx implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        icon: {
          type: "String",
          resolve(source, args, context, info) {
            const { icon } = source;
            if (source.icon == null) {
              return appConfig.doc["default-page-icon"];
            }
            return icon;
          },
        },
      },
    }),
  ];
  createTypes(typeDefs);
};
