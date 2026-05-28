import { notificationService } from "@/src/features/notifications/services/Notification.services"
import { requireAuth } from "@/src/lib/auth-server"
import { NextResponse } from "next/server"

export async function GET() {
    const {session} = await requireAuth()
    if(!session) return NextResponse.json(null)
    
    const ureadCount = await notificationService.unreadCount(session.user.id)
    return NextResponse.json(ureadCount)
}