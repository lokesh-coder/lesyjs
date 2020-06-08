export default {
  name: "remove",
  description: "Delete a key from the store",
  main: "store",
  group: "Store",
  args: {
    key: {
      required: true,
    },
  },
  run: ({ args, feature }) => {
    feature.store.delete(args.key);
    console.log(`Key ${args.key} is deleted`);
  },
};
