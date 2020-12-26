import cliSpinners from "cli-spinners";
let i = 0;

export const spinner = (_: any, ctx: any) => {
  const { frames, interval } = cliSpinners.dots;
  const cb = ctx.timer(
    "joo",
    () => {
      ctx.store.spinner = frames[i % frames.length];
      i += 1;
    },
    interval,
  );
  ctx.disposer(() => {
    // clearInterval(cb);
  });
  return ` ${ctx.store.spinner || "..."} `;
};
