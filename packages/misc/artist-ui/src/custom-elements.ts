import cliSpinners from "cli-spinners";

let i = 0;

const spinner = (_: any, __: any, store: any) => {
  const { frames, interval } = cliSpinners.dots;
  setInterval(() => {
    store.spinner = frames[i % frames.length];
    // tslint:disable-next-line: no-increment-decrement
    i++;
  }, interval);
  return store.spinner || "";
};

export { spinner };
