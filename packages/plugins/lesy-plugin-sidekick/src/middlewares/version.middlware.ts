export default {
  on: "PRE_VALIDATE",
  run(data) {
    const {
      config,
      feature,
      argv,
      utils: { color },
    } = data;
    if (!config.version.enable) return data;
    if (argv.some((d: string) => config.version.flags.includes(d))) {
      const chalk = color();
      console.log("version", `${chalk.green(feature.pkg.version)}`);
      process.exit();
    }
    return data;
  },
};
