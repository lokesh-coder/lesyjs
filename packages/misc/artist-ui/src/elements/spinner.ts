import cliSpinners from "cli-spinners";
export default {
  name: "spinner",
  init: ({ store, props, timer }) => {
    const { type = "dots" } = props;
    const { interval } = cliSpinners[type];
    if (!store.spinner) store.spinner = {};
    if (!store.spinner[type]) store.spinner[type] = 0;
    timer(
      () => {
        store.spinner[type] += 1;
      },
      interval,
      type,
    );
  },
  render: ({ store, props }) => {
    const { type = "dots" } = props;
    const { frames } = cliSpinners[type];
    return `${frames[store.spinner[type] % frames.length]}`;
  },
};
