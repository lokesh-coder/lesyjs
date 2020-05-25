import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Store, Select } from "@ngxs/store";
import { LoadLogs } from "./store/actions/logs.actions";
import {
  ListenForNotification,
  ResetNotification,
} from "./store/actions/notification.actions";
import { SelectedCommand } from "./store/actions/command.actions";
import { Observable } from "rxjs";
import { CommonState } from "./store/states/common.state";
import {
  SetConsolePanelHeight,
  ToggleConsolePanel,
  LoadConfig,
} from "./store/actions/common.actions";
import { ToppyControl, Toppy, GlobalPosition, InsidePlacement } from "toppy";
import { NotificationModel } from "./pilot.models";
import { ToastComponent } from "./components";
import { Hotkeys } from "./services/hotkeys.service";

const HOTKEY = "`";

@Component({
  selector: "pilot-main",
  templateUrl: "./pilot.template.html",
})
export class PilotMain implements OnInit {
  overlay: ToppyControl;
  toast: ToppyControl;

  @Select(CommonState.consolePanelsHeight())
  panelHeights$: Observable<number[]>;

  @Select((state) => state.notification)
  notification$: Observable<NotificationModel>;

  constructor(
    private store: Store,
    private toppy: Toppy,
    private route: Router,
    private hotkeys$: Hotkeys,
  ) {
    this.routeEvent(this.route);
  }

  ngOnInit() {
    this.store.dispatch(new LoadLogs());
    this.store.dispatch(new LoadConfig());
    this.store.dispatch(new ListenForNotification());

    this.notification$.subscribe((n) => {
      if (!n.message) {
        return;
      }
      const toast = this.createToast();
      toast.open();
      setTimeout(() => {
        toast.close();
        this.store.dispatch(new ResetNotification());
      }, 4000);
    });

    this.hotkeys$
      .addShortcut(HOTKEY, "backquote", "Toggle console panel")
      .subscribe(() => this.store.dispatch(new ToggleConsolePanel()));
  }
  onDragEnd({ sizes: [, height] }) {
    this.store.dispatch(new SetConsolePanelHeight(height));
  }

  private routeEvent(router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e);
        if (!e.url.includes("/commands/")) {
          this.store.dispatch(new SelectedCommand(null));
        }
      }
    });
  }

  private createToast() {
    const toastPosition = new GlobalPosition({
      placement: InsidePlacement.BOTTOM,
      width: 400,
      height: "auto",
    });

    return this.toppy
      .position(toastPosition)
      .config({
        backdrop: false,
      })
      .content(ToastComponent, { data$: this.notification$ })
      .create();
  }
}
