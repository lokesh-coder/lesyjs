import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { Toppy, RelativePosition, OutsidePlacement } from "toppy";

@Directive({
  selector: "[popover]",
})
export class PopoverDirective implements OnInit {
  private popoverPosition;
  private popover;
  @Input("popover") popoverContent;
  @Input() popoverPos = "BOTTOM";
  @Input() popoverOn = "HOVER";

  constructor(private el: ElementRef, private toppy: Toppy) {}

  ngOnInit() {
    this.popoverPosition = new RelativePosition({
      placement: OutsidePlacement[this.popoverPos],
      src: this.el.nativeElement,
    });
    this.popover = this.toppy
      .position(this.popoverPosition)
      .config({
        backdrop: false,
        closeOnDocClick: this.popoverOn === "CLICK",
      })
      .content(this.popoverContent)
      .create();
  }

  @HostListener("mouseenter") onMouseEnter() {
    if (this.popoverOn === "HOVER") {
      this.popover.open();
    }
  }

  @HostListener("mouseleave") onMouseLeave() {
    if (this.popoverOn === "HOVER") {
      this.popover.close();
    }
  }

  @HostListener("click") onClick() {
    if (this.popoverOn === "CLICK") {
      this.popover.toggle();
    }
  }
}
