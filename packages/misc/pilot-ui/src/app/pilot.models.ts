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
  config: { [key: string]: any };
}

export enum LogsDirection {
  DESC = "DESC",
  ASC = "ASC",
}

export interface LogsModel {
  logs: string[];
  direction: LogsDirection;
}
