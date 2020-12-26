export const key = (data: any, ctx: any) => {
  const props = ctx.getProps({});

  const children = data.children.map((child) => {
    if (child.attributes && Array.isArray(child.attributes)) {
      const id = child.attributes.find((a: any) => a.key === "id").value;
      child.attributes = child.attributes.map((attr) => {
        if (attr.key === "id") attr.value = `${id}-${props.index}`;
        return attr;
      });
    }
    return child;
  });
  return ctx.visitElements(children).join("");
};
