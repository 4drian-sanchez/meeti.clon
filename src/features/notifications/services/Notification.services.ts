import { INotificationRepository, notificationRepository } from './Notification.repository';


class NotificationService {

    constructor(
        private readonly notificationRepository: INotificationRepository
    ) { }

    async unreadCount( userId: string ) {
        return await this.notificationRepository.unreadCount(userId)
    }

    async getNotificationByUserId( userId: string ) {
        return await this.notificationRepository.notificationByUserId(userId)
    }

    async deleteNotifications(userId: string) {
        await this.notificationRepository.deleteNotification(userId) 
    }

}

export const notificationService = new NotificationService(notificationRepository)