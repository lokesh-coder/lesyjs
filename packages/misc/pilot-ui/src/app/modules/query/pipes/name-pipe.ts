import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "title" })
export class TitlePipe implements PipeTransform {
  transform(text: string): string {
    const result = text
      .replace(/([A-Z])/g, " $1")
      .replace(/-/g, " ")
      .toLowerCase();
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
