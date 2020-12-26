export const space = (data: any, ctx: any) => {
  const defaultProps = {
    length: "1",
  };

  const props = ctx.getProps(defaultProps);
  return `${" ".repeat(Number(props.length))}`;
};
