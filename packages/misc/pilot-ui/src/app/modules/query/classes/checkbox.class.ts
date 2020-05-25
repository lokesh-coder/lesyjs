import { Query } from "../model";

export class Checkbox extends Query<string> {
  controlType = "checkbox";
  type: string;

  constructor(options: { [key: string]: any } = {}) {
    super(options);
    this.type = options.type || "";
  }
}
