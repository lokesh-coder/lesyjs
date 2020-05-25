import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { QueryService } from "../../modules/query/services/query.service";
import { WsService } from "../../services/ws.service";
import { GlobalPosition, InsidePlacement, ToppyControl, Toppy } from "toppy";
import { PromptComponent } from "../prompt/prompt.component";
import { Store, Select } from "@ngxs/store";
import { LoadCommands } from "../../store/actions/commands.actions";
import { Observable } from "rxjs";
import { PromptModel } from "../../pilot.models";
import {
  ListenForPrompt,
  ResetPrompt,
} from "../../store/actions/prompt.actions";
import { ToggleConsolePanel } from "../../store/actions/common.actions";

@Component({
  selector: "pilot-command",
  templateUrl: "./command.template.html",
})
export class CommandComponent implements OnInit, OnChanges {
  @Input() command;
  @Input() config;
  shell = "";
  questions = [];

  @Select(state => state.prompt)
  prompt$: Observable<PromptModel>;

  constructor(
    private qs: QueryService,
    private wsService: WsService,
    private toppy: Toppy,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadCommands());
    this.store.dispatch(new ListenForPrompt());

    this.prompt$.subscribe(p => {
      if (!p.messageId) {
        return;
      }
      p.questions = p.questions.map(q => {
        if (!q.default) {
          q.required = true;
        }
        return q;
      });
      this.createModal(p.questions, p.messageId).open();
      this.store.dispatch(new ResetPrompt());
    });
  }

  ngOnChanges() {
    this.shell = this.parseShellCommand(
      this.command.family.join(" "),
      Object.keys(this.command.args),
      Object.keys(this.command.flags),
    );
    const argCollection = Object.keys(this.command.args).map(a => {
      return { name: a, ...this.command.args[a] };
    });
    const flagCollection = Object.keys(this.command.flags).map(a => {
      return { name: a, ...this.command.flags[a] };
    });
    this.questions = this.qs.getQuestions([
      ...argCollection,
      ...flagCollection,
    ]);
  }

  onDone(e) {
    this.wsService.send("requestRunCommand", [
      ...this.command.family,
      ...Object.values(e),
    ]);
  }

  onModalSave(qid, ans) {
    this.wsService.send("answers", { qid, ans });
  }

  toggleConsole() {
    this.store.dispatch(new ToggleConsolePanel());
  }

  private parseShellCommand(name, args, flags) {
    const cmd = `<span class="text-syntax-cmd">${this.config.pilot.cmdName}</span>`;
    const cmdName = `<span class="text-syntax-name font-bold">${name}</span>`;
    const cmdArgs = args
      .map(arg => {
        const openSqBracket = `<span class="text-syntax-bracket">[</span>`;
        const closeSqBracket = `<span class="text-syntax-bracket">]</span>`;
        const argName = `<span class="text-syntax-arg">${arg}</span>`;
        return `${openSqBracket}${argName}${closeSqBracket}`;
      })
      .join(" ");
    const cmdFlags = flags
      .map(flag => {
        return `<span class="text-syntax-flag">--${flag}</span> `;
      })
      .join("");
    return `$ ${cmd} ${cmdName} ${cmdArgs} ${cmdFlags}`;
  }

  private createModal(questions, messageId) {
    const position = new GlobalPosition({
      placement: InsidePlacement.CENTER,
      width: "50%",
      height: "auto",
    });

    return this.toppy
      .position(position)
      .config({
        closeOnDocClick: true,
        backdrop: true,
        backdropClass: "bg-overlay",
      })
      .content(PromptComponent, {
        questions: this.qs.getQuestions(questions),
        questionId: messageId,
        onModalSave: this.onModalSave.bind(this),
        command: this.command,
      })
      .create();
  }
}
