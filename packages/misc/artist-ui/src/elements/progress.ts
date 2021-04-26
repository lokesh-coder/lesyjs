import progressString from "progress-string";

export default {
  name: "progress",
  render: (_, data: any) => {
    const score = data.attributes.find((a: any) => a.key === "score")?.value;
    return progressString({
      width: 30,
      total: 100,
      style: (complete, incomplete) => {
        return `[<text color="green">${"▓".repeat(
          complete.length,
        )}</text><text color="dim">${"░".repeat(incomplete.length)}</text>]`;
      },
    })(Number(score));
  },
};
