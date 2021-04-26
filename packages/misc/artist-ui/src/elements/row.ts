const cliui = require("cliui");
import { flatten } from "../utils";

export default {
  name: "row",
  render: (ctx: any, data: any) => {
    const ui = cliui();
    const str = ctx
      .renderEl(data.children.filter((c: any) => c.tagName === "column"))
      .trim();

    const border = ctx.props.border !== undefined;

    ui.div(
      ...flatten(str.split("::"))
        .filter((x: any) => x)
        .map((text: any) => ({ text, border })),
    );
    return ui.toString();
  },
};
