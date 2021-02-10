const flatten = (arr) => {
  return arr.reduce((acc, val) => acc.concat(val), []);
};

const flattenToStr = (arr: any[]) => {
  return arr.reduce((acc: any[], val: any) => {
    if (Array.isArray(val)) acc.push(flattenToStr(val).join(" "));
    else acc.push(val);
    return acc;
  }, []);
};

export { flatten, flattenToStr };
