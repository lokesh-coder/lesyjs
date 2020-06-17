import { Injectable } from "@angular/core";
import { Textbox } from "../classes/textbox.class";
import { Query } from "../model";
import { DropdownQuestion } from "../classes/dropdown.class";
import { Checkbox } from "../classes/checkbox.class";

@Injectable({
  providedIn: "root",
})
export class QueryService {
  getQuestions(cmds) {
    return cmds.map((cmd, i) => {
      if (cmd.type === "list") {
        return new DropdownQuestion({
          key: cmd.name,
          label: cmd.message || cmd.name,
          options: cmd.choices.map((a) => ({ key: a, value: a })),
          order: 3,
          default: cmd.default,
        });
      } else if (cmd.type === "confirm") {
        return new Checkbox({
          key: cmd.name,
          label: cmd.message || cmd.name,
          value: false,
          required: false,
          order: i + 1,
          default: false,
        });
      } else {
        return new Textbox({
          key: cmd.name,
          label: cmd.message || cmd.name,
          value: cmd.default,
          required: cmd.required,
          order: i + 1,
          default: cmd.default,
        });
      }
    });
  }
}
