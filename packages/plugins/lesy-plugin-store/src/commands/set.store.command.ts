export default {
  name: "set",
  description: "Add new key-value to store",
  main: "store",
  group: "Store",
  args: {
    key: {
      required: true,
      description: "name for the key",
    },
    value: {
      required: true,
      description: "value to be stored",
    },
  },
  run: ({ args, feature }) => {
    feature.store.set(args.key, args.value);
    console.log(`success: set ${args.value} to ${args.key}`);
  },
};
