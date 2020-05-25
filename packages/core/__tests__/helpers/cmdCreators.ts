export const newCmdObj = (name, props = {}) => ({
  name,
  run: () => {},
  ...props,
});
export const newCmdFn = (name, props = {}) => (cmd: any) => {
  cmd.name = name;
  cmd.run = () => {};
  Object.keys(props).forEach((k: string) => {
    cmd[k] = props[k];
  });
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
