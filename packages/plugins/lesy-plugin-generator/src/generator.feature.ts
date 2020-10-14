interface GeneratorCtx {
  handlebarsInstance: (handlebars) => void;
  handebarsOptions: { [key: string]: any };
  data: { [key: string]: any };
  source: string;
  destination: string;
}

interface Feature {
  generateFiles: (ctx: GeneratorCtx) => any;
}

export default function (feature: Feature) {
  feature.generateFiles = function (data) {
    const scaffold = require("scaffold-generator2");
    const handlebars = require("handlebars");
    const text = require("case");
    const options = data.handebarsOptions || {};

    const cases = [
      "upper",
      "lower",
      "capital",
      "snake",
      "pascal",
      "camel",
      "header",
      "constant",
      "title",
    ];

    cases.forEach((c: any) => {
      handlebars.registerHelper(`${c}case`, (word: string) => text[c](word));
    });

    if (data.handlebarsInstance) {
      data.handlebarsInstance(handlebars);
    }

    return new scaffold({
      data: data.data || {},
      render: (str: string, data: string) =>
        handlebars.compile(str)(data, options),
    }).copy(data.source, data.destination);
  };
}
