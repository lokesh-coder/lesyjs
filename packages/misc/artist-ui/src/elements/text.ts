import chalk from "chalk";

export default {
  name: "text",
  render: (ctx, data) => {
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

    const props = { ...defaultProps, ...ctx.props };

    const textData = data.content ? data.content : ctx.renderEl(data.children);
    let style = chalk;
    if (props.color) style = style[props.color];
    ["bold", "underline", "italic", "strikethrough"].forEach((type) => {
      if (props[type] === null) style = style[type];
    });

    return style(textData);
  },
};
