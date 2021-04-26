export const newCmdObj = (name, props = {}) => ({
  name,
  run: () => {},
  ...props,
});
export const newCmdFn = (name, props = {}) => () => {
  return {
    name,
    run: () => {},
    ...props,
  };
};
export const newCmdClass = (name, props = {}) => {
  return class CustomCommand {
    name = name;
    constructor() {
      Object.keys(props).forEach((k: string) => {
        this[k] = props[k];
      });
    }

    run() {}
  };
};
