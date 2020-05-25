import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { UtilsService } from "../../services/utils.service";

@Component({
  selector: "pilot-config-page",
  templateUrl: "./config.template.html",
  styles: [],
})
export class ConfigPage implements OnInit {
  @Select(state => state.common.config)
  config$: Observable<object>;

  config = {};

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.config$.subscribe(conf => {
      this.config = Object.entries(this.utilsService.flattenObject(conf));
    });
  }
}
