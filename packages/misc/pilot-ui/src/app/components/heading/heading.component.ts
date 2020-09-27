import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "pilot-heading",
  templateUrl: "./heading.template.html",
})
export class HeadingComponent {
  @Input() h1: string;
  @Input() p: string;
}
