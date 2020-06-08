import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UtilsService {
  flattenObject(ob) {
    const flattenObj = {};

    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) {
        continue;
      }

      if (typeof ob[i] === "object") {
        const flatObject = this.flattenObject(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue;
          }

          flattenObj[i + "." + x] = flatObject[x];
        }
      } else {
        flattenObj[i] = ob[i];
      }
    }
    return flattenObj;
  }
}
