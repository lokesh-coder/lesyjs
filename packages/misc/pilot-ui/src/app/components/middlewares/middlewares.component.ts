import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngxs/store";
import { MiddlewaresModel, PilotState } from "../../pilot.models";

@Component({
  selector: "pilot-middlewares",
  templateUrl: "./middlewares.template.html",
})
export class MiddlewaresComponent implements OnInit {
  middlewares = {};
  constructor(private store: Store) {}
  ngOnInit() {
    const rawMiddlewares = this.store.selectSnapshot<any>(
      (state: PilotState) => state.middlewares,
    );
    this.middlewares = this.formatMiddlewaresShape(rawMiddlewares);
  }

  private formatMiddlewaresShape(middlewares: MiddlewaresModel): any {
    const mw = [];
    const hookNames = Object.keys(middlewares);
    hookNames.forEach((hook) => {
      mw.push({
        hookName: hook,
        hooks: middlewares[hook],
      });
    });
    console.log("mw", mw);
    return mw;
  }
}
