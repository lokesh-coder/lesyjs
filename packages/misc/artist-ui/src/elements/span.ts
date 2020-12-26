export const span = (data: any, ctx: any) => {
  return ctx.visitElements(data.children).join("");
};
