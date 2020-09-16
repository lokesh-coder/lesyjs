import { Command, Validation, State } from "./model";
declare class LesyCommand {
    private commands;
    private aliasesDict;
    private defaultProps;
    private static lastAddedID;
    constructor();
    add(rawCmd: Command | Function, src: string): void;
    findCommand(args?: string[], flags?: {}, ancestor?: string): Partial<State>;
    private resolveArgs;
    private resolveFlags;
    getCommands(): Command[];
    getCommandById(id: number): Command;
    getCommandByName(names: string[]): any;
    validate(command: Command, args: object, validators?: any[]): Promise<Validation>;
    private formatNames;
    private transformRawCommand;
    private isClass;
    private normalizeStr;
}
export { LesyCommand };
//# sourceMappingURL=command.d.ts.map