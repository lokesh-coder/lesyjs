import { exactValidator, requiredValidator, sizeValidator } from "./validators";

export class LesyValidator {
  private validators = {};
  private status: any[] = [];
  constructor(private schema: object) {
    this.register("exact", exactValidator);
    this.register("required", requiredValidator);
    this.register("size", sizeValidator);
  }
  async validate(obj: object) {
    if (!obj) return [];
    const entries = Object.entries(this.schema);
    for (let [name, rules] of entries) {
      if (typeof rules !== "object") {
        throw new Error(`invalid rules provide in ${name}`);
      }

      const errors = {};
      rules = Object.entries(rules).filter(([name, rule]) => {
        errors[name] = rule;
        return !name.includes("Error");
      });

      for (const [n, rule] of rules) {
        if (!this.validators[n]) continue;

        const isPassed = await this.validators[n](obj[name], rule);
        const error =
          (!isPassed &&
            (errors[`${n}Error`] ||
              `<${n}> validation failed for [${name}]`)) ||
          null;

        this.status.push({
          name,
          validator: n,
          passed: isPassed,
          error: typeof error === "function" ? error(obj[name]) : error,
        });
      }
    }

    return this.status;
  }
  register(
    name: string,
    fn: (val, rule) => Boolean | Promise<Boolean>,
    aliases: any[] = [],
  ): any {
    this.validators[name] = fn;
    aliases.forEach((a: any) => {
      this.validators[a] = fn;
    });
  }
}

// let va2 = new LesyValidator(['name[*,3<->7,==foobar|abc,/^abc/]','age']);
