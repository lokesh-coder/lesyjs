export const column = (data: any, ctx: any) => {
  return ctx.visitElements(data.children);
};
