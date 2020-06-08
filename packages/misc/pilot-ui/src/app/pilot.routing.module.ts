import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HelpPage, RunPage, CommandsPage, ConfigPage } from "./pages";

const routes: Routes = [
  {
    path: "",
    component: CommandsPage,
  },
  {
    path: "commands/:id",
    component: CommandsPage,
  },
  {
    path: "run",
    component: RunPage,
  },
  {
    path: "config",
    component: ConfigPage,
  },
  {
    path: "help",
    component: HelpPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class PilotRoutingModule {}
