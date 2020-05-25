import {
  Toppy,
  RelativePosition,
  OutsidePlacement,
  GlobalPosition,
  InsidePlacement,
  ToppyControl,
} from "toppy";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ModalService {
  overlay: ToppyControl;
  constructor(private toppy: Toppy) {
    const position = new GlobalPosition({
      placement: InsidePlacement.CENTER,
    });

    this.overlay = this.toppy
      .position(position)
      .content("hello")
      .create();
  }

  open() {
    console.log(this.overlay);
    this.overlay.open();
  }

  close() {
    this.overlay.close();
  }
}
