import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { ToppyModule } from "toppy";
import { AngularSplitModule } from "angular-split";

/* Components */
import { CommandComponent } from "./components/command/command.component";
import { ConsoleComponent } from "./components/console/console.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { PromptComponent } from "./components/prompt/prompt.component";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";
import { ToastComponent } from "./components/toast/toast.component";
import { HeadingComponent } from "./components/heading/heading.component";

/* Directives */
import { TooltipDirective } from "./directives/tooltip/tooltip.directive";
import { PopoverDirective } from "./directives/popover/popover.directive";
import { CopyDirective } from "./directives/copy/copy.directive";

/* Pages */
import { CommandsPage } from "./pages/commands/commands.page";
import { ProjectsPage } from "./pages/projects/projects.page";
import { HelpPage } from "./pages/help/help.page";
import { RunPage } from "./pages/run/run.page";
import { SettingsPage } from "./pages/settings/settings.page";
import { ConfigPage } from "./pages/config/config.page";

/* States */
import { ProjectsState } from "./store/states/projects.state";
import { ProjectState } from "./store/states/project.state";
import { CommandsState } from "./store/states/commands.state";
import { CommandState } from "./store/states/command.state";
import { CommonState } from "./store/states/common.state";
import { LogsState } from "./store/states/logs.state";
import { NotificationState } from "./store/states/notification.state";
import { PromptState } from "./store/states/prompt.state";
import { RunnersState } from "./store/states/runners.state";

/* Local modules */
import { QueryModule } from "./modules/query/query.module";
import { PilotRoutingModule } from "./pilot.routing.module";

/* Services */
import { SafeHtmlPipe } from "./services/safehtml.service";

import { environment } from "../environments/environment.prod";
import { PilotMain } from "./pilot.main";

@NgModule({
  declarations: [
    PilotMain,
    ToastComponent,
    SidemenuComponent,
    SearchbarComponent,
    PromptComponent,
    HeaderComponent,
    HeadingComponent,
    CommandComponent,
    ConsoleComponent,
    FooterComponent,
    TooltipDirective,
    PopoverDirective,
    CopyDirective,
    SettingsPage,
    RunPage,
    CommandsPage,
    ProjectsPage,
    ConfigPage,
    HelpPage,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    PilotRoutingModule,
    QueryModule,
    ToppyModule,
    NgxsModule.forRoot(
      [
        ProjectsState,
        ProjectState,
        CommandsState,
        CommandState,
        CommonState,
        LogsState,
        NotificationState,
        PromptState,
        RunnersState,
      ],
      {
        developmentMode: !environment.production,
      },
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot(),
    AngularSplitModule.forRoot(),
  ],
  bootstrap: [PilotMain],
  entryComponents: [PromptComponent, ToastComponent],
})
export class PilotModule {}
