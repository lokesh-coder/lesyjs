import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Query } from "../../model";
import { QueryControlService } from "../../services/control.service";
import { switchMap, distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "query-form",
  templateUrl: "./form.template.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryFormComponent implements OnInit {
  @Input() questions: Query<any>[] = [];
  @Input() sectionName = "";
  form: FormGroup;
  payLoad = "";
  @Output() done: EventEmitter<any> = new EventEmitter();
  @Output() status: EventEmitter<any> = new EventEmitter();

  private subscription: Subscription;

  constructor(private qcs: QueryControlService) {}

  ngOnInit() {
    // this.form = this.qcs.toFormGroup(this.questions);
    this.subscription = this.form.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(status => {
        this.status.emit(status);
      });
  }

  ngAfterContentInit() {}

  ngOnChanges(changes) {
    this.form = this.qcs.toFormGroup(changes.questions.currentValue);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.done.emit(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
