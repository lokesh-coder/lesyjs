require("jest-each-object/register");
import { LesyCommand } from "../src/command";
import * as helpers from "./helpers/cmdCreators";
import { propsData } from "./helpers/data.provider";
import { Command } from "../src/model";

const { newCmdFn, newCmdClass, newCmdObj } = helpers;

describe("LESY:COMMAND", () => {
  let cmd: LesyCommand;
  let mockExit;
  const OBJ = "__OBJECT__";
  beforeEach(() => {
    cmd = new LesyCommand();
    mockExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
      throw new Error("__PROCESS_EXIT__");
    });
  });
  afterEach(() => {
    mockExit.mockRestore();
  });
  describe.each(["OBJECT", "FUNCTION", "CLASS"])(
    "test for %s",
    (TYPE: string) => {
      const cmdTypeMap = {
        OBJECT: "newCmdObj",
        FUNCTION: "newCmdFn",
        CLASS: "newCmdClass",
      };
      const createNewCmd = (...params) => helpers[cmdTypeMap[TYPE]](...params);
      const createXCmds = (num, props: any = {}) => {
        return Array(num)
          .fill("cmd")
          .map((x, i) => x + i)
          .map((x, i) =>
            createNewCmd(x, typeof props === "object" ? props : props(i)),
          );
      };

      describe("create command", () => {
        it("should create a new command", () => {
          const newCmd = createNewCmd("one");
          const cmdObj = cmd["transformRawCommand"](newCmd);
          expect(cmdObj).toHaveProperty("name", "one");
        });

        it("should create a new command object and push it to the list", () => {
          const cmdObjs = ["one", "two", "three"];
          cmdObjs.forEach((n: string) => {
            cmd.addCommandFromRawObject(createNewCmd(n), OBJ);
          });
          expect(cmd["commands"].length).toEqual(3);
          expect(cmd["commands"][0].name).toEqual("one");
          expect(cmd["commands"][1].name).toEqual("two");
          expect(cmd["commands"][2].name).toEqual("three");
        });

        it("should create a new command and normalize the name", () => {
          const names = ["one one", "two.two", "three_three"];
          names.forEach((n: string) => {
            cmd.addCommandFromRawObject(createNewCmd(n), OBJ);
          });
          expect(cmd.getCommands().map((s: Command) => s.name)).toEqual([
            "one-one",
            "two-two",
            "three_three",
          ]);
        });
      });

      describe("create command with props", () => {
        it["eachObject"](propsData)(
          "should set proper $name prop",
          ({ input, expected }) => {
            const newCmd = createNewCmd("one", input);
            const cmdObj = cmd["transformRawCommand"](newCmd);
            expect(cmdObj).toHaveProperty(expected[0], expected[1]);
          },
        );
      });

      describe("get command", () => {
        it("should return the command when name is provided", () => {
          createXCmds(5).map((c: any) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.findCommand(["cmd1"])({});
          expect(command.runningCommand).toHaveProperty("name", "cmd1");
        });
        it("should return the command when name and args are provided", () => {
          createXCmds(5, { args: { name: {} } }).map((c: any) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.findCommand(["cmd3", "john"])({});
          expect(command.args.name).toBe("john");
        });
        it("should return the command when id is provided", () => {
          createXCmds(5).map((c: any) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.getCommandById(2);
          expect(command).toHaveProperty("name", "cmd2");
        });
        it("should return the command when name is provided", () => {
          createXCmds(5).map((c: any) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.getCommandByName(["cmd4"]);
          expect(command).toHaveProperty("name", "cmd4");
        });
        it("should return the command when alias is provided", () => {
          createXCmds(5, (i: number) =>
            i === 3 ? { aliases: ["hola"] } : {},
          ).map((c: any, i) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.findCommand(["hola"])({});
          expect(command.runningCommand).toHaveProperty("name", "cmd3");
        });
        it("should return the command with resolved args", () => {
          createXCmds(5, (i: number) =>
            i === 3 ? { args: { name: {}, age: {} } } : {},
          ).map((c: any, i) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.findCommand(["cmd3", "john", "33"])({});
          expect(command.args).toEqual({ name: "john", age: "33" });
        });
        it("should return the command with resolved flags", () => {
          createXCmds(5, (i: number) =>
            i === 3 ? { flags: { temp: {} } } : {},
          ).map((c: any, i) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.findCommand(["cmd3"])({ temp: "yes" });
          expect(command.flags).toEqual({ temp: "yes" });
        });
        it("should return the command without unknown flags", () => {
          createXCmds(5, (i: number) =>
            i === 3 ? { flags: { temp: {} } } : {},
          ).map((c: any, i) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          const command = cmd.findCommand(["cmd3"])({ temphoya: "yes" });
          expect(command.flags).toEqual({});
        });
        it("should throw error when command name is not provided", () => {
          createXCmds(5).map((c: any, i) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          try {
            cmd.findCommand([])({});
          } catch (error) {
            expect(error.message).toBe("__PROCESS_EXIT__");
          }
        });
        it("should throw error when command args are not provided", () => {
          createXCmds(5).map((c: any, i) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          try {
            cmd.findCommand();
          } catch (error) {
            expect(error.message).toBe("__PROCESS_EXIT__");
          }
        });
        it("should throw error when unavailable command is requested", () => {
          createXCmds(5).map((c: any, i) => {
            cmd.addCommandFromRawObject(c, OBJ);
          });
          try {
            cmd.findCommand(["boom-boom"])({});
          } catch (error) {
            expect(error.message).toBe("__PROCESS_EXIT__");
          }
        });
      });

      describe("get sub command", () => {
        it("should return the sub command when name is provided", () => {
          const parentCmd = createNewCmd("parent");
          const childCmd = createNewCmd("child", { main: "parent" });
          cmd.addCommandFromRawObject(parentCmd, OBJ);
          cmd.addCommandFromRawObject(childCmd, OBJ);
          const command = cmd.findCommand(["parent", "child"])({});
          expect(command.runningCommand).toHaveProperty("main", "parent");
        });
        it("should return the sub command when name and args are provided", () => {
          const parentCmd = createNewCmd("parent");
          const childCmd = createNewCmd("child", {
            main: "parent",
            args: { name: {} },
          });
          cmd.addCommandFromRawObject(parentCmd, OBJ);
          cmd.addCommandFromRawObject(childCmd, OBJ);
          const command = cmd.findCommand(["parent", "child", "john"])({});
          expect(command.runningCommand).toHaveProperty("args", { name: {} });
        });
        it("should return sub command of multiple mid-level same parent name", () => {
          const data = [
            { name: "p1", props: {} },
            { name: "p2", props: {} },
            { name: "p3", props: {} },
            { name: "c1", props: { main: "p1" } },
            { name: "c2", props: { main: "p2" } },
            { name: "c3", props: { main: "p3" } },
            { name: "gc1", props: { main: "c1" } },
            { name: "gc2", props: { main: "c2" } },
            { name: "gc3", props: { main: "c3" } },
          ];
          data.forEach(({ name, props }) =>
            cmd.addCommandFromRawObject(createNewCmd(name, props), OBJ),
          );
          const command = cmd.findCommand(["p3", "c3", "gc3"])({});
          expect(command.runningCommand).toHaveProperty("main", "c3");
        });
        it("should return sub command if aliases is provided", () => {
          const data = [
            { name: "p1", props: { aliases: ["palias1"] } },
            { name: "c1", props: { main: "p1", aliases: ["calias1"] } },
            { name: "gc1", props: { main: "c1", aliases: ["gcalias1"] } },
          ];
          data.forEach(({ name, props }) =>
            cmd.addCommandFromRawObject(createNewCmd(name, props), OBJ),
          );
          const command = cmd.findCommand(["palias1", "calias1", "gcalias1"])(
            {},
          );
          expect(command.runningCommand).toHaveProperty("main", "c1");
        });
        it("should get arg value if parent has args and child is not exists", () => {
          const data = [
            { name: "p1", props: {} },
            { name: "c1", props: { main: "p1", args: { name: {} } } },
            { name: "gc1", props: { main: "c1" } },
          ];
          data.forEach(({ name, props }) =>
            cmd.addCommandFromRawObject(createNewCmd(name, props), OBJ),
          );

          const command = cmd.findCommand(["p1", "c1", "john"])({});
          expect(command.args).toHaveProperty("name", "john");
        });
        it("should get cmd if parent has args and child is exists", () => {
          const data = [
            { name: "p1", props: {} },
            { name: "c1", props: { main: "p1", args: { name: {} } } },
            { name: "gc1", props: { main: "c1" } },
          ];
          data.forEach(({ name, props }) =>
            cmd.addCommandFromRawObject(createNewCmd(name, props), OBJ),
          );
          const command = cmd.findCommand(["p1", "c1", "gc1"])({});
          expect(command.runningCommand).toHaveProperty("name", "gc1");
        });
        it("should throw error when parent is invalid", () => {
          const data = [
            { name: "p1", props: {} },
            { name: "c1", props: { main: "p1" } },
            { name: "gc1", props: { main: "c1" } },
          ];
          data.forEach(({ name, props }) =>
            cmd.addCommandFromRawObject(createNewCmd(name, props), OBJ),
          );

          try {
            cmd.findCommand(["c1", "gc1"])({});
          } catch (error) {
            expect(error.message).toBe("__PROCESS_EXIT__");
          }
        });
        it("should throw error when child is accessed directly", () => {
          const data = [
            { name: "p1", props: {} },
            { name: "c1", props: { main: "p1" } },
            { name: "gc1", props: { main: "c1" } },
          ];
          data.forEach(({ name, props }) =>
            cmd.addCommandFromRawObject(createNewCmd(name, props), OBJ),
          );

          try {
            cmd.findCommand(["gc1"])({});
          } catch (error) {
            expect(error.message).toBe("__PROCESS_EXIT__");
          }
        });
      });

      describe("get command list", () => {
        it("should return the list of command objects", () => {
          createXCmds(4).forEach((c: Command) =>
            cmd.addCommandFromRawObject(c, OBJ),
          );
          expect(cmd.getCommands().length).toEqual(4);
          expect(cmd.getCommands()[0].name).toBe("cmd0");
        });
      });
    },
  );
  describe("utils", () => {
    it("should return true if isClass is called with class", () => {
      expect(cmd["isClass"](class Foobar {})).toBeTruthy();
    });
    it("should return false if isClass is called with function", () => {
      const fn = function () {};
      // tslint:disable-next-line: ter-prefer-arrow-callback
      expect(cmd["isClass"](function () {})).toBeFalsy();
      expect(cmd["isClass"](() => {})).toBeFalsy();
      expect(cmd["isClass"](fn)).toBeFalsy();
    });
    it.each(["abc.xyz", "abc xyz", "abc|xyz", "abc+xyz"])(
      "should normalize the command name",
      (name: string) => {
        expect(cmd["normalizeStr"](name)).toBe("abc-xyz");
      },
    );
  });
  describe("validation", () => {
    it("should validate the args", async () => {
      const cmd0 = {
        name: "cmd0",
        args: { name: { req: true } },
        run: () => {},
      };
      const validators = [{ name: "req", fn: () => true }];
      const res = await cmd.validate(cmd0, { name: "" }, validators);
      expect(res).toHaveProperty("isPassed", true);
    });
    it("should not validate if no validators are provided", async () => {
      const cmd0 = {
        name: "cmd0",
        args: { name: {} },
        run: () => {},
      };
      const res = await cmd.validate(cmd0, { name: "" });
      expect(res).toHaveProperty("isPassed", true);
    });
    it("should return false if required param is not provided", async () => {
      const cmd0 = {
        name: "cmd0",
        args: { name: { req: true } },
        run: () => {},
      };
      const validators = [{ name: "req", fn: () => false }];
      const res = await cmd.validate(cmd0, { name: "" }, validators);
      expect(res).toHaveProperty("isPassed", false);
      expect(res.errors[0]).toHaveProperty(
        "error",
        "<req> validation failed for [name]",
      );
    });
  });
});
