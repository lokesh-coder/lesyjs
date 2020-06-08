import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Query } from "../model";

@Injectable({
  providedIn: "root",
})
export class QueryControlService {
  constructor() {}

  toFormGroup(questions: Query<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      const validator = question.required ? Validators.required : [];
      group[question.key] = new FormControl(question.value || "", validator);
    });
    return new FormGroup(group);
  }
}
