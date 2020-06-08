import { Injectable } from "@angular/core";
import { Subject, ReplaySubject, Observable } from "rxjs";
import { WsService } from "./ws.service";
import { filter, map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PromptService {
  constructor(private wsService: WsService) {}

  getPrompt(): Observable<any> {
    return this.wsService.listen().pipe(filter(p => p && p.messageId));
  }
}
