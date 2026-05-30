import { pusher } from "@/src/lib/pusher";
import { SelectNotification } from "../types/notification.types";

export interface INotificationPublisher {
    verify(notification: SelectNotification): Promise<void>
}

class NotificationPusher implements INotificationPublisher {
    async verify(notification: SelectNotification): Promise<void> {
        await pusher.trigger(
            `notification-channel-${notification.userId}`,
            'new-notification',
            notification
        )
    }
}

export const notificationPusher = new NotificationPusher()