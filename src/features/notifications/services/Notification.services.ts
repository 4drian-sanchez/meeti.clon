import { InsertNotification, SelectNotification } from '../types/notification.types';
import { INotificationPublisher, notificationPusher } from './Notification.pusher';
import { INotificationRepository, notificationRepository } from './Notification.repository';


export interface INotificationService {
    createAndNotify( data : InsertNotification ) : Promise<void>
    unreadCount( userId: string ) : Promise<number>
    getNotificationByUserId( userId: string ) :  Promise<SelectNotification[]>
    deleteNotifications(userId: string) : Promise<void>
}

class NotificationService implements INotificationService {

    constructor(
        private readonly notificationRepository: INotificationRepository,
        private readonly notificationPusher : INotificationPublisher
    ) { }

    async createAndNotify(data: InsertNotification): Promise<void> {
        const notification = await this.notificationRepository.create(data)
        await notificationPusher.verify(notification)
    }

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

export const notificationService = new NotificationService( notificationRepository, notificationPusher )