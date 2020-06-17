export const requiredValidator = (value, rule) => rule === !!value;
export const exactValidator = (value, rule) => value === rule;
export const sizeValidator = (value, rule) => {
  return !!value && value.length >= rule.min && value.length <= rule.max;
};
