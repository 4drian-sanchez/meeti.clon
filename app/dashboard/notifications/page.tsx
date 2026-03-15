import Heading from "@/components/typography/Heading";
import NotificationsList from "@/src/features/notifications/components/NotificationsList";
import { notificationService } from "@/src/features/notifications/services/Notification.services";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";

const title = 'Tus notificaciones'


export default async function NotificationsPage() {

    const {session} = await requireAuth()
    if(!session) redirect('/auth/login')

    const notifications = await notificationService.getNotificationByUserId(session.user.id)
    await notificationService.deleteNotifications(session.user.id)

    return (
        <>
            <Heading>{title}</Heading>
            <NotificationsList notifications={notifications}/>
        </>
    );
}