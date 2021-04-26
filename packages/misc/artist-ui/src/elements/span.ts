export default {
  name: "span",
  render: (ctx: any, data: any) => {
    return ctx.renderEl(data.children);
  },
};
