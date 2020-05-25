import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { QueryFormComponent } from "./components/form/form.component";
import { QueryInputComponent } from "./components/input/input.component";
import { TitlePipe } from "./pipes/name-pipe";

@NgModule({
  declarations: [QueryFormComponent, QueryInputComponent, TitlePipe],
  exports: [QueryFormComponent, QueryInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class QueryModule {}
