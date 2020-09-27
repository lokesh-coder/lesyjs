export class SetConsolePanelHeight {
  static readonly type = "[Console Panel] set panel size";
  constructor(public height: number) {}
}

export class SetConsolePanelFullScreen {
  static readonly type = "[Console Panel] full screen";
}

export class ToggleConsolePosition {
  static readonly type = "[Console Panel] toggle position";
}

export class ToggleConsolePanel {
  static readonly type = "[Console Panel] toggle panel";
}

export class LoadConfig {
  static readonly type = "[Config] load Config";
}

export class SetConfig {
  static readonly type = "[Config] set config";
  constructor(public config: { [key: string]: any }) {}
}
