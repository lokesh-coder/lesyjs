const boxen = require("boxen");

export default {
  name: "box",
  render: (ctx: any, data: any) => {
    return boxen(ctx.renderEl(data.children));
  },
};
