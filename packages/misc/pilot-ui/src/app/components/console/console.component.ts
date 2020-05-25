import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Select, Store, Actions, ofActionDispatched } from "@ngxs/store";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AddLog, ReverseLogs } from "../../store/actions/logs.actions";

@Component({
  selector: "pilot-console",
  templateUrl: "./console.template.html",
})
export class ConsoleComponent implements OnInit {
  @Select(state => state.logs.logs)
  logs$: Observable<string[]>;

  constructor(private store: Store, private actions$: Actions) {}

  @ViewChild("consoleEl", { static: true }) consoleEl: ElementRef;

  ngOnInit() {
    this.actions$
      .pipe(ofActionDispatched(AddLog, ReverseLogs))
      .pipe(debounceTime(100))
      .subscribe((log: any) => {
        const direction = this.store.selectSnapshot(
          (state: any) => state.logs.direction,
        );
        const pointer = direction === "DESC" ? "end" : "start";
        this.consoleEl.nativeElement.scrollIntoView({
          block: pointer,
          behavior: "smooth",
        });
      });
  }
}
