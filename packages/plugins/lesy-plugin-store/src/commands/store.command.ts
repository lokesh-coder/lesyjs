export default {
  name: "store",
  description: "List all stored key values",
  group: "Store",
  run: ({ feature }) => {
    const keyValueObj = feature.store.all;
    const keys = Object.keys(keyValueObj);
    if (keys.length === 0) {
      console.log("No keys found!");
      return;
    }
    keys.forEach((key: string) => {
      console.log(`${key} => ${keyValueObj[key]}`);
    });
  },
};
