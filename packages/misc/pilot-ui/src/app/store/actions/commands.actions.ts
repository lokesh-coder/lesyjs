export class LoadCommands {
  static readonly type = "[Commands] Load commands";
}

export class UpdateCommands {
  static readonly type = "[Commands] Update commands";
  constructor(public commands: any[]) {}
}
