export interface CommandModel {
  name: string;
  args: {
    [name: string]: {
      required: boolean;
      type: string;
    };
  };
  flags: {
    [name: string]: {
      required: boolean;
      type: string;
    };
  };
  description: string;
  id: string;
  isVisible: boolean;
  group: string;
}

export interface ProjectModel {
  name: string;
  path: string;
}

export interface RunnerModel {
  name: string;
  description: string;
  script: string;
}

export interface PromptModel {
  messageId: string;
  questions: any[];
}

export interface NotificationModel {
  status: string;
  message: {
    title: string;
    details: string;
  };
}

export interface CommonModel {
  consoleHeight: number;
  consolePosition: "vertical" | "horizontal";
  config: { [key: string]: any };
}

export enum LogsDirection {
  DESC = "DESC",
  ASC = "ASC",
}

export interface LogsModel {
  logs: Array<Array<string | number>>;
  direction: LogsDirection;
}

export interface PilotState {
  projects: ProjectModel[];
  project: ProjectModel;
  commands: CommandModel[];
  command: CommandModel;
  common: CommonModel;
  logs: LogsModel;
  notification: NotificationModel;
  prompt: PromptModel;
  runners: RunnerModel;
}
