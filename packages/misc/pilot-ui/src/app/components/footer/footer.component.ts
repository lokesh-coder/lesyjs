import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { ToggleConsolePanel } from "../../store/actions/common.actions";
import { Observable } from "rxjs";
import { ClearLogs, ReverseLogs } from "../../store/actions/logs.actions";
import { Hotkeys } from "../../services/hotkeys.service";

@Component({
  selector: "pilot-footer",
  templateUrl: "./footer.template.html",
})
export class FooterComponent {
  @Select((state) => state.command)
  selectedCommand$: Observable<object>;

  @Select((state) => (state.common.consoleHeight === 0 ? "CLOSED" : "OPEN"))
  consoleStatus$: Observable<"CLOSED" | "OPEN">;

  constructor(private store: Store, private hotkeys: Hotkeys) {}

  toggleConsole() {
    this.store.dispatch(new ToggleConsolePanel());
  }
  clearLogs() {
    this.store.dispatch(new ClearLogs());
  }

  reverseLogs() {
    this.store.dispatch(new ReverseLogs());
  }

  fileName(path = "") {
    if (path === "__OBJ__") {
      return "Object command";
    }
    const segments = path.split("/");
    return segments[segments.length - 1];
  }

  getRegisteredHotKeys() {
    return this.hotkeys.getRegisteredKeys();
  }
}
