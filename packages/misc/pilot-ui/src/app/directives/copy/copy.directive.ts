import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { NotificationService } from "../../services/notification.service";

@Directive({ selector: "[copy]" })
export class CopyDirective {
  constructor(private notificationService: NotificationService) {}

  @Input("copy")
  payload: HTMLElement;

  @Output()
  copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener("click", ["$event"])
  onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.payload) {
      return;
    }

    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || (window as any).clipboardData;
      const content = this.payload.textContent.replace("$ ", "").trim();
      clipboard.setData("text", content);
      e.preventDefault();

      this.copied.emit(content);
      this.notificationService.sendLocalNotification({
        status: "SUCCESS",
        title: "Copied",
        details: "Command copied to clipboard",
      });
    };

    document.addEventListener("copy", listener, false);
    document.execCommand("copy");
    document.removeEventListener("copy", listener, false);
  }
}
