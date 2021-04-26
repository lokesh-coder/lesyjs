// Documentation pages and schema
const { createPages } = require("./builder/doc/create-pages");
const { createSchemaCustomization } = require("./builder/doc/create-schema");

module.exports = {
  createPages,
  createSchemaCustomization,
};
