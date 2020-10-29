import { Component } from "@angular/core";
import { helpContent } from "./help.content";

@Component({
  selector: "pilot-help-page",
  templateUrl: "./help.template.html",
})
export class HelpPage {
  helpContent = helpContent;

  onContentReady() {
    console.log("content loaded");
  }
}
