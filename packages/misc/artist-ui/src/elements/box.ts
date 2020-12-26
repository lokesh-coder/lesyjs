const boxen = require("boxen");

export const box = (data: any, ctx: any) => {
  return boxen(ctx.visitElements(data.children).join(""));
};
