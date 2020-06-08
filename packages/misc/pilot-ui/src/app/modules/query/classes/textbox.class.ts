import { Query } from "../model";

export class Textbox extends Query<string> {
  controlType = "textbox";
  type: string;

  constructor(options: { [key: string]: any } = {}) {
    super(options);
    this.type = options.type || "";
  }
}
