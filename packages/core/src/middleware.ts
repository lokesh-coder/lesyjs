import trough from "trough";
import {
  MiddlewarePlacements,
  Middleware,
  MiddlewarePlacement,
  MiddlewareContext,
} from "./model";

class LesyMiddleware {
  private middlewares: MiddlewarePlacements = {
    INIT: [],
    START: [],
    PRE_VALIDATE: [],
    POST_VALIDATE: [],
    PRE_PARSE: [],
    POST_PARSE: [],
    PRE_RUN: [],
    POST_RUN: [],
    END: [],
  };

  add(mw: Middleware) {
    this.middlewares[mw.on].push(mw);
  }

  get() {
    return this.middlewares;
  }

  run(
    placement: MiddlewarePlacement,
    ctx: MiddlewareContext,
  ): Promise<MiddlewareContext> {
    const troughMiddleware = trough();

    this.middlewares[placement].forEach((mw: Middleware) => {
      troughMiddleware.use(mw.run);
    });

    return new Promise((resolve, reject) => {
      troughMiddleware.run(ctx, (err: object, ctx: MiddlewareContext) => {
        if (err) reject(err);
        else resolve(ctx);
      });
    });
  }
}

export { LesyMiddleware };
