import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import {
  ToggleConsolePanel,
  SetConsolePanelFullScreen,
} from "../../store/actions/common.actions";
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

  @Select((state) => {
    const height = state.common.consoleHeight;
    if (height === 0) return "CLOSED";
    if (height === 100) return "FULLSCREEN";
    return "OPEN";
  })
  consoleStatus$: Observable<"CLOSED" | "OPEN" | "FULLSCREEN">;

  constructor(private store: Store, private hotkeys: Hotkeys) {}

  toggleConsole() {
    this.store.dispatch(new ToggleConsolePanel());
  }

  setConsoleFullScreen() {
    this.store.dispatch(new SetConsolePanelFullScreen());
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
