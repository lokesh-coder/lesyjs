export default {
  name: "div",
  render: (ctx, data) => {
    return [null, ctx.renderEl(data.children), null].join("\n");
  },
};
