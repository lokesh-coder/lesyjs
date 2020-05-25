const propsData = [
  { name: "main", input: { main: "parent" }, expected: ["main", "parent"] },
  {
    name: "args",
    input: { args: { name: "john" } },
    expected: ["args", { name: "john" }],
  },
];

export { propsData };
