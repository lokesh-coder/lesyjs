export default {
  name: "column",
  render: (ctx: any, data: any) => {
    // tslint:disable-next-line: prefer-template
    return ctx.renderEl(data.children) + "::";
  },
};
