export const requiredValidator = value => !!value;
export const exactValidator = (value, rule) => value === rule;
export const sizeValidator = (value, rule) => {
  return !!value && value.length >= rule.min && value.length <= rule.max;
};
