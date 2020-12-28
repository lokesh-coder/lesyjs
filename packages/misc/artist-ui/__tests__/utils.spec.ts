import { flatten, flattenToStr } from "../src/utils";

describe("utils", () => {
  it("should deep flatten the array", () => {
    const input = ["one", "two", ["three", "four"], ["five", ["six", "seven"]]];
    expect(flattenToStr(input)).toEqual([
      "one",
      "two",
      "three four",
      "five six seven",
    ]);
  });

  it("should flatten the array to one level", () => {
    const input = ["one", "two", ["three", "four"], ["five", ["six", "seven"]]];
    expect(flatten(input)).toEqual([
      "one",
      "two",
      "three",
      "four",
      "five",
      ["six", "seven"],
    ]);
  });
});
