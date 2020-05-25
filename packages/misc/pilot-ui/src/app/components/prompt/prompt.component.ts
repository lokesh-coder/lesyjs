import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pilot-prompt",
  templateUrl: "./prompt.template.html",
})
export class PromptComponent implements OnInit {
  close;
  questions;
  onModalSave;
  questionId;
  command;
  constructor() {}

  ngOnInit() {
    console.log("QWE", this.questions);
  }
  save(answers) {
    this.close();
    this.onModalSave(this.questionId, answers);
  }
  onStatusChange(status) {
    console.log("== STATUS ==", status);
  }
}
