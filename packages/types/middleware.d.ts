import { Middleware, MiddlewarePlacement, MiddlewareContext } from "./model";
declare class LesyMiddleware {
    private middlewares;
    add(mw: Middleware): void;
    get(): Record<MiddlewarePlacement, Middleware[]>;
    run(placement: MiddlewarePlacement, ctx: MiddlewareContext): Promise<MiddlewareContext>;
}
export { LesyMiddleware };
//# sourceMappingURL=middleware.d.ts.map