import { Injectable, Inject } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
import { Observable } from "rxjs";

interface Options {
  element: any;
  keys: string;
}

@Injectable({ providedIn: "root" })
export class Hotkeys {
  defaults: Partial<Options> = {
    element: this.document,
  };

  private registeredKeys = [];

  constructor(
    private eventManager: EventManager,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  addShortcut(key, name, description) {
    const merged = { ...this.defaults, keys: key };
    const event = `keydown.${merged.keys}`;
    this.registeredKeys.push([key, name, description]);

    return new Observable((observer) => {
      const handler = (e) => {
        e.preventDefault();
        observer.next(e);
      };

      const dispose = this.eventManager.addEventListener(
        merged.element,
        event,
        handler,
      );

      return () => {
        dispose();
      };
    });
  }

  getRegisteredKeys(): Array<[string, string]> {
    return this.registeredKeys;
  }
}
