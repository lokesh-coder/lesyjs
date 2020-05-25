export class LoadLogs {
  static readonly type = "[Logs] Load logs";
}

export class AddLog {
  static readonly type = "[Logs] Add logs";
  constructor(public log: string) {}
}

export class ClearLogs {
  static readonly type = "[Logs] Clear logs";
}

export class ReverseLogs {
  static readonly type = "[Logs] Reverse logs";
}
