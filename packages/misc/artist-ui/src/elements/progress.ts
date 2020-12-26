import progressString from "progress-string";

export const progress = (data: any, ctx) => {
  const score = data.attributes.find((a: any) => a.key === "score")?.value;
  return progressString({
    width: 30,
    total: 100,
    style: (complete, incomplete) => {
      return (
        // tslint:disable-next-line: prefer-template
        "[" +
        ctx.color.green("▓".repeat(complete.length)) +
        "" +
        ctx.color.dim("░".repeat(incomplete.length)) +
        "]"
      );
    },
  })(Number(score));
};
