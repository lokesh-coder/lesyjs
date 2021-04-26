export default {
  on: "PRE_RUN",
  run: (ctx) => {
    const cmd = ctx.runningCommand;
    if (cmd.render) {
      ctx.runningCommand.run = async (ctx) => {
        const artist = ctx.feature.artist(ctx.config);
        if (cmd.onInit) {
          artist.ui.onInit(cmd.onInit);
        }
        artist.ui.render(
          cmd.render.bind(ctx, {
            ...ctx,
            store: artist.ui.store,
          }),
        );
      };
    }
    return ctx;
  },
};
