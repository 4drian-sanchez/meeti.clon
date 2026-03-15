import { notificationService } from "@/src/features/notifications/services/Notification.services"
import { requireAuth } from "@/src/lib/auth-server"

export async function GET() {

    const {session} = await requireAuth()
    if(!session) return new Response(JSON.stringify(null))
    
    const ureadCount = await notificationService.unreadCount(session.user.id)

    return new Response(JSON.stringify(ureadCount), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}