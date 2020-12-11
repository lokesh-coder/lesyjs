import { Chalk } from "chalk";
import { Ora } from "ora";

export interface SimpleObj<T> {
  [key: string]: T;
}

export interface ArgSchema {
  required: boolean;
}

export interface FlagSchema {
  required: boolean;
  aliases: string[];
}

export const enum MiddlewarePlacement {
  INIT = "INIT",
  START = "START",
  PRE_VALIDATE = "PRE_VALIDATE",
  POST_VALIDATE = "POST_VALIDATE",
  PRE_PARSE = "PRE_PARSE",
  POST_PARSE = "POST_PARSE",
  PRE_RUN = "PRE_RUN",
  POST_RUN = "POST_RUN",
  END = "END",
}

export type MiddlewareFn = (
  context: Partial<State>,
  next?: () => any,
) => Partial<State>;

export interface Middleware {
  on: MiddlewarePlacement;
  run: MiddlewareFn;
  source?: string;
}

export type MiddlewareContext = Record<string, any>;

export type MiddlewarePlacements = Record<MiddlewarePlacement, Middleware[]>;

export interface CommandRunContext {
  args: { [key: string]: string };
  flags: { [key: string]: string };
  rest: { [key: string]: string };
  root: string;
  config: { [key: string]: any };
  feature: { [key: string]: any };
  utils: { color: Function; spinner: Function };
  argv: string[];
  command: Command;
}

export type ValidatorFn = (name: string, rule: any) => boolean;
export interface Validator {
  name: string;
  fn: ValidatorFn;
}
export interface Request {
  runCommand: (argv: string[]) => any;
  getCommandById: (ID: number) => Command;
  getCommandByName: (name: string) => Command;
  getCommands: () => Command[];
}

export type Utils = () => { color: Chalk; spinner: Ora };

interface DefaultConfig {
  defaultCommand: string;
}

export interface State {
  argv: string[];
  id: number;
  args: Record<string, string | number | boolean>;
  flags: Record<string, string | number | boolean>;
  rawArgs: string[];
  rawFlags: Record<string, string | boolean>;
  unknownArgs: string[];
  unknownFlags: string[];
  config: Record<string, any> & Partial<DefaultConfig>;
  root: string;
  feature: Record<string, any>;
  utils: Readonly<Partial<Utils>>;
  request: Partial<Request>;
  cmdRunError: Error;
  validators: Validator[];
  allCommands: Command[];
  runningCommand: Command;
}

export interface Command {
  id?: Readonly<number>;
  name: string;
  run: (ctx: Partial<State>) => any;
  description?: string;
  aliases?: string[];
  args?: any;
  flags?: any;
  group?: string;
  isVisible?: boolean;
  main?: string | null;
  src?: Readonly<string>;
}

export interface Validation {
  isPassed: boolean;
  errors: any[];
}

export interface FeatureObj {
  [key: string]: any;
}

export type Feature = (feature: FeatureObj, opts: any) => void;

export interface Constructor<T> extends Function {
  new (...args: any[]): T;
}
type GenericClass = { new (...args: any[]): any };
type CommandClass = { new (...args: any[]): Command };

type ExtractFunctionCommand<T> = Function & { prototype: T };
type ExtractStringCommand<T> = T extends string ? string : never;
type ExtractRawCommand<T> = T extends Command ? Command : never;
type ExtractClassCommand<T> = Function & { prototype: T };

export type CommandSource =
  | ExtractFunctionCommand<Function>
  | ExtractStringCommand<string>
  | ExtractRawCommand<Command>
  | ExtractClassCommand<Command>;

export type Plugin = string | [string, any] | any;
// export type Plugin<T> = T extends string ? string : [string, any];

// namespace Validation {}
// namespace Middleware {}
// namespace Feature {}
