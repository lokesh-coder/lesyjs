import { NotificationModel } from "../../pilot.models";

export class ListenForNotification {
  static readonly type = "[Notification] Listening for notification";
}

export class UpdateNotification {
  static readonly type = "[Notification] Update prompt";
  constructor(public notification: NotificationModel) {}
}

export class ResetNotification {
  static readonly type = "[Notification] reset notification";
}
