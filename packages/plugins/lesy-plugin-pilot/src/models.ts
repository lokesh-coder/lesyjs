export interface LesyWorkSpace {
  [key: string]: string;
}

export interface SocketInputData {
  requestSwitchProject: (name: string) => any;
  requestRunCommand: () => any;
  requestProject: () => any;
  requestAllProjects: () => any;
  requestAllCommands: () => any;
  requestConfig: () => any;
}

export interface AnyObject {
  [key: string]: any;
}
