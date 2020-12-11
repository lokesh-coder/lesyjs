const flatten = (arr) => {
  return arr.reduce((acc, val) => acc.concat(val), []);
};

const flattenToStr = (arr) => {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(flattenToStr(val).join(" "));
      return acc;
    }
    acc.push(val);
    return acc;
  }, []);
};

export { flatten, flattenToStr };
