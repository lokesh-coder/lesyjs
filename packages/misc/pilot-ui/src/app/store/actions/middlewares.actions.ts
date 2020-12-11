export class LoadMiddlewares {
  static readonly type = "[Middlewares] Load middlewares";
}

export class UpdateMiddlewares {
  static readonly type = "[Middlewares] Update middlewares";
  constructor(public middlewares: any) {}
}
