export const div = (data: any, ctx: any) => {
  return [null, ctx.visitElements(data.children).join("\n"), null].join("\n");
};
