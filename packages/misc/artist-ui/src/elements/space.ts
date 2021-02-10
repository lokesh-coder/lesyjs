export default {
  name: "space",
  render: (ctx: any, data: any) => {
    const defaultProps = {
      length: "1",
    };

    const props = { ...defaultProps, ...ctx.props };
    return `${" ".repeat(Number(props.length))}`;
  },
};
