import { LesyFeature } from "../src/feature";

describe("Feature", () => {
  let feature: LesyFeature;
  beforeEach(() => {
    feature = new LesyFeature();
  });
  test("basic", () => {
    const obj = (f: any) => {
      f.abc = "xyz";
      return f;
    };
    feature.add(obj);
    expect(feature.getFeatures()).toMatchObject({ abc: "xyz" });
  });
});
