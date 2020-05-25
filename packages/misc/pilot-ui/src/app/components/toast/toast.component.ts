import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "pilot-toast",
  templateUrl: "./toast.template.html",
})
export class ToastComponent implements OnInit {
  data$: Observable<object>;
  constructor() {}

  ngOnInit() {
    this.data$.subscribe(a => {
      console.log("@@@", a);
    });
  }
}
