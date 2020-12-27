import { Feature, FeatureObj } from "./model";
import { utils } from "./utilities";

class LesyFeature {
  private feature = {};
  constructor(private root: string) {}

  add(featureFn: Feature) {
    featureFn(this.feature, this.root, utils);
  }
  getFeatures(): FeatureObj {
    return this.feature;
  }
}
export { LesyFeature };
