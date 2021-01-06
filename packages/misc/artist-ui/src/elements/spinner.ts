import cliSpinners from "cli-spinners";
let i = 0;

export const spinner = (_: any, ctx: any) => {
  const { frames, interval } = cliSpinners.dots;
  ctx.timer(
    "joo",
    () => {
      ctx.store.spinner = frames[i % frames.length];
      i += 1;
    },
    interval,
  );
  ctx.disposer(() => {});
  return ` ${ctx.store.spinner || frames[0]} `;
};
