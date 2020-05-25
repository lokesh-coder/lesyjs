import { Feature, FeatureObj } from "./model";
declare class LesyFeature {
    private root;
    private feature;
    constructor(root: string);
    add(featureFn: Feature): void;
    getFeatures(): FeatureObj;
}
export { LesyFeature };
//# sourceMappingURL=feature.d.ts.map