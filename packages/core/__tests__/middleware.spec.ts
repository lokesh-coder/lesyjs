import { LesyMiddleware } from "../src/middleware";
import { Middleware, MiddlewarePlacement } from "../src/model";

describe("Feature", () => {
  let lesyMw: LesyMiddleware;
  beforeEach(() => {
    lesyMw = new LesyMiddleware();
  });
  it("should add middlewares to the collection", () => {
    const mw1: Middleware = { on: "START", run: () => {} };
    const mw2: Middleware = { on: "END", run: () => {} };

    const { START, END } = lesyMw.get();

    expect(START.length).toEqual(0);
    expect(END.length).toEqual(0);

    lesyMw.add(mw1);
    lesyMw.add(mw2);

    const { START: _START, END: _END } = lesyMw.get();

    expect(_START.length).toEqual(1);
    expect(_END.length).toEqual(1);
  });

  describe("run middlwares", () => {
    it("should run middlware", async () => {
      const mockFn = jest.fn();
      const data = { name: "test" };
      const mw1: Middleware = { on: MiddlewarePlacement.START, run: mockFn };
      lesyMw.add(mw1);
      await lesyMw.run(MiddlewarePlacement.START, data);
      expect(mockFn).toBeCalledWith(data);
    });

    it("should not run if no middlware defined", async () => {
      const mockFn = jest.fn();
      const mw1: Middleware = { on: MiddlewarePlacement.START, run: mockFn };
      lesyMw.add(mw1);
      await lesyMw.run(MiddlewarePlacement.END, {});
      expect(mockFn).not.toBeCalled();
    });

    it("should manipulate data", async () => {
      const fn1 = jest.fn().mockImplementation((data: any[]) => {
        data.push("fn1");
      });
      const fn2 = jest.fn().mockImplementation((data: any[]) => {
        data.push("fn2");
      });
      const fn3 = jest.fn().mockImplementation((data: any[]) => {
        data.push("fn3");
      });

      const data = [];
      const feature = { feature: "one" };

      const mw1: Middleware = { on: MiddlewarePlacement.END, run: fn1 };
      const mw2: Middleware = { on: MiddlewarePlacement.END, run: fn2 };
      const mw3: Middleware = { on: MiddlewarePlacement.END, run: fn3 };

      lesyMw.add(mw1);
      lesyMw.add(mw2);
      lesyMw.add(mw3);

      const output = await lesyMw.run(MiddlewarePlacement.END, data);
      expect(output).toEqual(["fn1", "fn2", "fn3"]);
    });

    it("should run middlwares in a order", async () => {
      const order: string[] = [];
      const mockFn = jest.fn().mockImplementation(() => {
        order.push("fn1");
      });
      const mockFn1 = jest.fn().mockImplementation(() => {
        order.push("fn2");
      });
      const mockFn2 = jest.fn().mockImplementation(() => {
        order.push("fn3");
      });

      const data = { name: "test" };
      const feature = { feature: "one" };

      const mw1: Middleware = { on: MiddlewarePlacement.END, run: mockFn };
      const mw2: Middleware = { on: MiddlewarePlacement.END, run: mockFn1 };
      const mw3: Middleware = { on: MiddlewarePlacement.END, run: mockFn2 };

      lesyMw.add(mw1);
      lesyMw.add(mw2);
      lesyMw.add(mw3);

      await lesyMw.run(MiddlewarePlacement.END, data);

      expect(order).toEqual(["fn1", "fn2", "fn3"]);
    });

    it("should run all middlwares", async () => {
      const mockFn = jest.fn();
      const mockFn1 = jest.fn();
      const mockFn2 = jest.fn();

      const data = { name: "test" };

      const mw1: Middleware = { on: MiddlewarePlacement.END, run: mockFn };
      const mw2: Middleware = { on: MiddlewarePlacement.END, run: mockFn1 };
      const mw3: Middleware = { on: MiddlewarePlacement.END, run: mockFn2 };

      lesyMw.add(mw1);
      lesyMw.add(mw2);
      lesyMw.add(mw3);

      await lesyMw.run(MiddlewarePlacement.END, data);

      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(data);
      expect(mockFn1).toBeCalledWith(data);
      expect(mockFn2).toBeCalledWith(data);
    });

    it("should run all async middlwares", async () => {
      const fn1 = jest.fn().mockImplementation((data: any) => {
        return new Promise((res: any) => {
          setTimeout(() => {
            data.push("fn1");
            res(data);
          }, 100);
        });
      });
      const fn2 = jest.fn().mockImplementation((data: any) => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            data.push("fn2");
            res(data);
          }, 50);
        });
      });

      const data = [];

      const mw1: Middleware = { on: MiddlewarePlacement.END, run: fn1 };
      const mw2: Middleware = { on: MiddlewarePlacement.END, run: fn2 };

      lesyMw.add(mw1);
      lesyMw.add(mw2);

      const output = await lesyMw.run(MiddlewarePlacement.END, data);

      expect(output).toEqual(["fn1", "fn2"]);
      expect(fn1).toBeCalledTimes(1);
      expect(fn2).toBeCalledWith(data);
    });

    it("should throw err when any middleware promise is rejected", () => {
      const fn1 = jest.fn().mockImplementation((data: any[]) => {
        return new Promise((res: any) => {
          setTimeout(() => {
            data.push("fn1");
            res(data);
          }, 100);
        });
      });
      const fn2 = jest.fn().mockImplementation((data: any) => {
        return new Promise((_, rej) => {
          setTimeout(() => {
            rej(new Error("something went wrong!!"));
          }, 50);
        });
      });

      const data = [];
      const feature = { feature: "one" };

      const mw1: Middleware = { on: MiddlewarePlacement.END, run: fn1 };
      const mw2: Middleware = { on: MiddlewarePlacement.END, run: fn2 };

      lesyMw.add(mw1);
      lesyMw.add(mw2);

      expect(lesyMw.run(MiddlewarePlacement.END, data)).rejects.toThrowError(
        new Error("something went wrong!!"),
      );
    });

    it("should throw err when any middleware is called with done data", async () => {
      const fn1 = jest.fn().mockImplementation((data: any) => {
        return new Promise((res: any) => {
          setTimeout(() => {
            data.push("fn1");
            res(data);
          }, 100);
        });
      });
      const fn2 = jest.fn().mockImplementation((data, done) => {
        done("foobar");
      });

      const data = [];

      const mw1: Middleware = { on: MiddlewarePlacement.END, run: fn1 };
      const mw2: Middleware = {
        on: MiddlewarePlacement.END,
        run: ((d, f, n) => fn2(d, f, n)) as any,
      };

      lesyMw.add(mw1);
      lesyMw.add(mw2);

      try {
        await lesyMw.run(MiddlewarePlacement.END, data);
      } catch (error) {
        expect(error).toBe("foobar");
      }
    });
  });
});
