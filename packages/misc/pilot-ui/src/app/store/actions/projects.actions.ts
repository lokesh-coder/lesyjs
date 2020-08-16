export class LoadProjects {
  static readonly type = "[Projects] Load projects";
}

export class UpdateProjects {
  static readonly type = "[Projects] Update projects";
  constructor(public projects: any[]) {}
}
