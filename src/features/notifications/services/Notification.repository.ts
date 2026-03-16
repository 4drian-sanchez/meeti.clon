import { db } from "@/src/db";
import { SelectNotification, InsertNotification } from "../../types/notification.types";
import { NotificationSchema } from "@/src/db/schemas";
import { and, count, eq } from "drizzle-orm";


export interface INotificationRepository {
    create( data : InsertNotification ) : Promise<SelectNotification>
    unreadCount(userId: string) : Promise<number>
    notificationByUserId( userId: string ) : Promise<SelectNotification[]>
    deleteNotification( userId : string ) : Promise<void>
}

class NotificationRepository implements INotificationRepository {
    
    async create(data: InsertNotification): Promise<SelectNotification> {
        const [ notification ] = await db.insert(NotificationSchema).values(data).returning()
        return notification
    }

    async unreadCount(userId: string): Promise<number> {
        const [result] = await db
                                .select( { count: count() } )
                                .from(NotificationSchema)
                                .where( and(  eq( NotificationSchema.userId, userId ), eq( NotificationSchema.read, false ) ) )
        return result.count
    }

    async notificationByUserId(userId: string): Promise<SelectNotification[]> {
        const result = await db.query.NotificationSchema.findMany({
            where: {
                AND: [
                    {userId: {eq: userId}},
                    {read: {eq: false}  }
                ]
            },
            limit: 10,
            orderBy: {createdAt: 'desc'}
        })
        return result
    }

    async deleteNotification(userId: string): Promise<void> {
        //*Eliminado logico
        await db.update(NotificationSchema).set({read: true}).where( eq(NotificationSchema.userId, userId) )
    }
}

export const notificationRepository = new NotificationRepository()