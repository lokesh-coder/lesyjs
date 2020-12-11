const cliui = require("cliui");
import { flatten } from "./utils";

const text = (data: any) => {
  const textData = data.content
    ? data.content
    : data.children.map((x: any) => x.content).join("");
  return textData.trim();
};

const div = (data: any, visitElements: Function) => {
  return [null, visitElements(data.children).join("\n"), null].join("\n");
};

const span = (data: any, visitElements: Function) => {
  return visitElements(data.children).join("");
};

const row = (data: any, visitElements: Function) => {
  const ui = cliui();
  const str = visitElements(
    data.children.filter((c: any) => c.tagName === "column"),
  );
  const border = !!data.attributes.find((a: any) => a.key === "border");

  ui.div(...flatten(str).map((text: any) => ({ text, border })));
  const res = ui.toString();

  return res;
};

const column = (data: any, visitElements: Function) => {
  return visitElements(data.children);
};

const newline = () => {
  return "\n";
};

module.exports = { text, newline, row, column, div, span };
