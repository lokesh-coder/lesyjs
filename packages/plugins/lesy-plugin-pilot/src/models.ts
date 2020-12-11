export interface LesyWorkSpace {
  [key: string]: any;
}

export interface SocketInputData {
  requestSwitchProject: (name: string) => any;
  requestRunCommand: (x: any) => any;
  requestProject: () => any;
  requestAllProjects: () => any;
  requestAllCommands: () => any;
  requestAllMiddlewares: () => any;
  requestConfig: () => any;
}

export interface AnyObject {
  [key: string]: any;
}
