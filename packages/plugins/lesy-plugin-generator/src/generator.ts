export default function(feature: any) {
  feature.generateFiles = function(data: any) {
    const scaffold = require("scaffold-generator");
    const handlebars = require("handlebars");
    const text = require("case");

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

    return new scaffold({
      data: data.data || {},
      // function `options.render` accepts `str` and `data`, then returns a `str`
      render: (str: string, data: string) => handlebars.compile(str)(data),
    }).copy(data.source, data.destination);
  };
}
