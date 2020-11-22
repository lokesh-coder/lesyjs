import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { Toppy, OutsidePlacement, SlidePlacement, SlidePosition } from "toppy";

@Directive({
  selector: "[panel]",
})
export class PanelDirective implements OnInit {
  private panelPosition;
  private panel;
  @Input("panel") panelContent;
  @Input() panelOn = "CLICK";

  constructor(private toppy: Toppy) {}

  ngOnInit() {
    this.panelPosition = new SlidePosition({
      placement: SlidePlacement.RIGHT,
      width: "30%",
    });
    this.panel = this.toppy
      .position(this.panelPosition)
      .config({
        backdrop: true,
        closeOnDocClick: this.panelOn === "CLICK",
      })
      .content(this.panelContent)
      .create();
  }

  @HostListener("click") onClick() {
    if (this.panelOn === "CLICK") {
      this.panel.toggle();
    }
  }
}
