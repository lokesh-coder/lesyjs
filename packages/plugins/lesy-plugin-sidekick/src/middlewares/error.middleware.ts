export default {
  on: "END",
  run(data) {
    if (data.cmdRunError) {
      const { stack } = data.cmdRunError;
      console.log(stack);
    }
  },
};
