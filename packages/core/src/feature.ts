import { Feature, FeatureObj } from "./model";

class LesyFeature {
  private feature = {};
  constructor(private root: string) {}

  add(featureFn: Feature) {
    featureFn(this.feature, this.root);
  }
  getFeatures(): FeatureObj {
    return this.feature;
  }
}
export { LesyFeature };
