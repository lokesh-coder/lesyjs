import { Command, Validation, State } from "./model";
declare class LesyCommand {
    private commands;
    private aliasesDict;
    private defaultProps;
    private static lastAddedID;
    constructor();
    addCommandFromRawObject(rawCmd: Command | Function, src: string): void;
    findCommand(args?: string[], ancestor?: string): ReturnType<() => (flags: Record<string, string | boolean>) => Partial<State>>;
    private mapFlagAliases;
    getCommands(): Command[];
    getCommandById(id: number): Command;
    getCommandByName(names: string[]): any;
    validate(command: Command, args: object, validators?: any[]): Promise<Validation>;
    private mapValuesWithArgs;
    private normalizeCmdNames;
    private transformRawCommand;
    private isClass;
    private normalizeStr;
}
export { LesyCommand };
//# sourceMappingURL=command.d.ts.map