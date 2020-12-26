const cliui = require("cliui");
import { flatten } from "../utils";

export const row = (data: any, ctx: any) => {
  const ui = cliui();
  const str = ctx.visitElements(
    data.children.filter((c: any) => c.tagName === "column"),
  );
  const border = !!data.attributes.find((a: any) => a.key === "border");

  ui.div(...flatten(str).map((text: any) => ({ text, border })));
  const res = ui.toString();

  return res;
};
