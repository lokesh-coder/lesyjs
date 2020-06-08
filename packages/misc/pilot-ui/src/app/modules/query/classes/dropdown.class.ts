import { Query } from "../model";

export class DropdownQuestion extends Query<string> {
  controlType = "dropdown";
  options: { key: string; value: string }[] = [];

  constructor(options: { [key: string]: any } = {}) {
    super(options);
    this.options = options.options || [];
  }
}
