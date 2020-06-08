import hello from "../src/commands/hello";

describe("Hello command", () => {
  let consoleLogMock;
  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
  });

  it("should return proper response", async () => {
    hello.run({ args: { name: "foo" } });
    expect(consoleLogMock).toBeCalledWith("Hello foo!");
  });
});
