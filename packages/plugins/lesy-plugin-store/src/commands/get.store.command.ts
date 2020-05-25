export default {
  name: "get",
  description: "Fetch value for the stored key",
  main: "store",
  group: "Store",
  args: {
    key: {
      required: true,
    },
  },
  run: ({ args, feature }) => {
    const value = feature.store.get(args.key);
    console.log(`value for ${args.key}:`, value);
  },
};
