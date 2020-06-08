import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { Toppy, RelativePosition, OutsidePlacement, ToppyControl } from "toppy";

@Directive({
  selector: "[tooltip]",
})
export class TooltipDirective implements OnInit {
  private tooltipPosition;
  private tooltip: ToppyControl;
  @Input("tooltip") tooltipContent;
  @Input() tooltipPos = "TOP";

  constructor(private el: ElementRef, private toppy: Toppy) {}

  ngOnInit() {
    this.tooltipPosition = new RelativePosition({
      placement: OutsidePlacement[this.tooltipPos],
      src: this.el.nativeElement,
    });
    this.tooltip = this.toppy
      .position(this.tooltipPosition)
      .config({
        backdrop: false,
      })
      .create();
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.tooltip.updateContent(this.tooltipContent, {
      class: "tooltip",
    });
    this.tooltip.open();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.tooltip.close();
  }
}
