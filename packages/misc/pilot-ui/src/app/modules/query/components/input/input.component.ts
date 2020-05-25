import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Query } from "../../model";

@Component({
  selector: "query-input",
  templateUrl: "./input.template.html",
})
export class QueryInputComponent {
  @Input() question: Query<any>;
  @Input() form: FormGroup;

  get isValid() {
    if (this.form.controls[this.question.key]) {
      return this.form.controls[this.question.key].valid;
    }
    return false;
  }
}
