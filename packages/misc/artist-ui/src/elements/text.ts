export const text = (data: any, ctx) => {
  const defaultProps = {
    pl: "0",
    pr: "0",
    color: "",
    bg: "",
    dim: undefined,
    italic: undefined,
    strikethrough: undefined,
    bold: undefined,
    underline: undefined,
  };

  const props = ctx.getProps(defaultProps);

  const textData = data.content
    ? data.content
    : ctx.visitElements(data.children).join("");
  let style = ctx.color;
  if (props.color) style = style[props.color];
  ["bold", "underline", "italic", "strikethrough"].forEach((type) => {
    if (props[type] === null) style = style[type];
  });

  return style(textData.trim());
};
