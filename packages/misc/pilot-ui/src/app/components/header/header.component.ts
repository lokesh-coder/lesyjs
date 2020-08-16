import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: "pilot-header",
  templateUrl: "./header.template.html",
})
export class HeaderComponent {
  menuItems = [];
  @Select((state) => state.common.config)
  webConfig$: Observable<object>;

  ngOnInit() {
    this.menuItems = [
      { name: "Home", path: "/", icon: "ri-home-4-line" },
      { name: "Projects", path: "/projects", icon: "ri-folder-line" },
      { name: "Run", path: "/run", icon: "ri-terminal-line" },
      { name: "Config", path: "/config", icon: "ri-settings-5-line" },
      { name: "Help", path: "/help", icon: "ri-questionnaire-line" },
    ];
  }
}
