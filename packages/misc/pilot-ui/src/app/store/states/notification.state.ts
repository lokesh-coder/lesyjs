import { State, Action, StateContext } from "@ngxs/store";
import { tap, mergeMap } from "rxjs/operators";
import { NotificationModel } from "../../pilot.models";
import { NotificationService } from "../../services/notification.service";
import {
  UpdateNotification,
  ListenForNotification,
  ResetNotification,
} from "../actions/notification.actions";

@State<NotificationModel>({
  name: "notification",
  defaults: {
    status: "SUCCESS",
    message: undefined,
  },
})
export class NotificationState {
  constructor(private notificationService: NotificationService) {}

  @Action(ListenForNotification)
  listen(ctx: StateContext<NotificationModel>) {
    return this.notificationService.getNotification().pipe(
      tap(message => {
        console.log("NOT", message);
      }),
      mergeMap(message =>
        ctx.dispatch(
          new UpdateNotification({ status: message.status, message }),
        ),
      ),
    );
  }

  @Action(UpdateNotification)
  update(ctx: StateContext<NotificationModel>, action: UpdateNotification) {
    console.log("UPDATE NOTI", action);
    ctx.setState(action.notification);
  }

  @Action(ResetNotification)
  reset(ctx: StateContext<NotificationModel>) {
    ctx.setState({ message: undefined, status: "" });
  }
}
