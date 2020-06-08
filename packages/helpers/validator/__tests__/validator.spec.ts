import { LesyValidator } from "../src/index";

describe("LesyValidator", () => {
  afterEach(() => {
    expect.hasAssertions();
  });

  it("should succeed if schema is empty", async () => {
    const lesyValidator = new LesyValidator({});
    expect(await lesyValidator.validate({ name: "test" })).toEqual([]);
  });
  it("should throw err if required param is falsy", async () => {
    const lesyValidator = new LesyValidator({ name: { required: true } });
    const validation = await lesyValidator.validate({});

    expect(validation).toMatchSnapshot();
    expect(validation.length).toEqual(1);
    expect(validation[0].passes).toBeFalsy();
  });
  it("should succeed if required param is truthy", async () => {
    const lesyValidator = new LesyValidator({ name: { required: true } });
    const validation = await lesyValidator.validate({ name: "test" });

    expect(validation).toMatchSnapshot();
    expect(validation.length).toEqual(1);
    expect(validation[0].passed).toBeTruthy();
  });
  it("should succeed if no validators defined in schema", async () => {
    const lesyValidator = new LesyValidator({});
    const validation = await lesyValidator.validate({ name: "test" });

    expect(validation.length).toEqual(0);
  });
  it("should throw errs as array if multiple props failed", async () => {
    const lesyValidator = new LesyValidator({
      name: { required: true },
      age: { required: true },
    });
    const validation = await lesyValidator.validate({ name: null });

    expect(validation).toMatchSnapshot();
    expect(validation.length).toEqual(2);
    expect(validation[0].passed).toBeFalsy();
    expect(validation[1].passed).toBeFalsy();
  });
  it("should throw errs as array if multiple validators failed", async () => {
    const lesyValidator = new LesyValidator({
      name: { required: true, foo: "bar", size: { min: 4, max: 10 } },
      age: { required: true },
    });
    const validation = await lesyValidator.validate({ name: null });

    expect(validation.length).toEqual(3);
    expect(validation.every((v: any) => v.passed)).toBeFalsy();
  });
  it("should throw err if schema is invalid", async () => {
    const lesyValidator = new LesyValidator({
      name: "some text",
    });
    try {
      await lesyValidator.validate({ name: "test" });
    } catch (e) {
      expect(e.message).toEqual("invalid rules provide in name");
    }
  });
  it("should register custom validator", async () => {
    const lesyValidator = new LesyValidator({
      name: { enum: ["hello", "world"] },
    });
    lesyValidator.register("enum", (value, rule) => {
      return rule.includes(value);
    });

    const validation = await lesyValidator.validate({ name: "hello" });

    expect(validation.length).toEqual(1);
    expect(validation[0].passed).toBeTruthy();
  });
  it("should succeed for async validator", async () => {
    const lesyValidator = new LesyValidator({
      name: { delay: 100 },
    });
    lesyValidator.register(
      "delay",
      (_, __): Promise<Boolean> => {
        return new Promise((res, rej) => {
          res(false);
        });
      },
    );

    const validation = await lesyValidator.validate({ name: "hello" });
    expect(validation.length).toEqual(1);
    expect(validation[0].passed).toBeFalsy();
  });
  it("should have errs as array if multiple mixed validators failed ", async () => {
    const lesyValidator = new LesyValidator({
      name: { size: { min: 8, max: 10 }, delay: 100 },
    });
    lesyValidator.register(
      "delay",
      (_, __): Promise<Boolean> => {
        return new Promise((res, rej) => {
          res(false);
        });
      },
    );

    const validation = await lesyValidator.validate({ name: "hello" });
    expect(validation.length).toEqual(2);
    expect(validation.every((v: any) => v.passed)).toBeFalsy();
  });
  it("should have err in the same order in schema for sync validators", async () => {
    const lesyValidator = new LesyValidator({
      name: { required: true, size: { min: 4, max: 10 } },
    });

    const validation = await lesyValidator.validate({ name: null });

    expect(validation.length).toEqual(2);
    expect(validation[0].passed).toBeFalsy();
    expect(validation.every((v: any) => v.passed)).toBeFalsy();
    expect(validation.map((v: any) => v.validator)).toEqual(
      expect.arrayContaining(["required", "size"]),
    );
  });
  it("should have default err when validation failed", async () => {
    const lesyValidator = new LesyValidator({
      name: { required: true },
    });

    const validation = await lesyValidator.validate({});

    expect(validation.length).toEqual(1);
    expect(validation[0].error).toEqual(
      "<required> validation failed for [name]",
    );
  });
  it("should have err with custom message", async () => {
    const lesyValidator = new LesyValidator({
      name: { required: true, requiredError: "value is required!" },
    });

    const validation = await lesyValidator.validate({});

    expect(validation.length).toEqual(1);
    expect(validation[0].error).toEqual("value is required!");
  });
  it("should have errs when custom err message func is available", async () => {
    const lesyValidator = new LesyValidator({
      name: {
        required: true,
        requiredError: "value is required!",
        size: { min: 4, max: 10 },
        sizeError: (value: string) => {
          return `size of ${value} doesnt meet the required length`;
        },
      },
    });

    const validation = await lesyValidator.validate({ name: "hi" });

    expect(validation.length).toEqual(2);
    expect(validation.map((v: any) => v.error)).toEqual([
      null,
      "size of hi doesnt meet the required length",
    ]);
  });
  it("should able to override inbuild validators", async () => {
    const lesyValidator = new LesyValidator({
      name: { required: true },
    });
    lesyValidator.register("required", (value, rule) => {
      return false;
    });

    const validation = await lesyValidator.validate({ name: "hello" });

    expect(validation.length).toEqual(1);
    expect(validation[0].passed).toBeFalsy();
  });
  it("should accept aliases for validator name", async () => {
    const lesyValidator = new LesyValidator({ name: { noSpace: true } });

    lesyValidator.register("empty", (val, _) => !val.includes(" "), [
      "noSpace",
    ]);

    const validation = await lesyValidator.validate({ name: "hello buddy" });

    expect(validation.length).toEqual(1);
    expect(validation[0].passed).toBeFalsy();
  });
  it("should ignore if subject prop is not object", async () => {
    const lesyValidator = new LesyValidator({ name: { required: true } });
    const validation = await lesyValidator.validate(null as any);

    expect(validation.length).toEqual(0);
  });
  it("should ignore unknown rules", async () => {
    const schema = { name: { required: true, description: "user name" } };
    const obj = { name: "John" };

    const lesyValidator = new LesyValidator(schema);
    const validation = await lesyValidator.validate(obj);

    expect(validation.length).toEqual(1);
  });
});
