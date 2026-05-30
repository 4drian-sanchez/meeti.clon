"use client"

import { formatCreatedDate } from "@/src/shared/utils/date";
import { SelectNotification } from "../types/notification.types";
import { useEffect, useState } from "react";
import { useSession } from "@/src/lib/auth-client";
import Pusher from 'pusher-js'

type Props = {
    notifications: SelectNotification[]
}


export default function NotificationsList( {notifications} : Props ) {

    const { data } = useSession()
    const [ unreadNotifications, setUnreadNotifications ] = useState(notifications)

      useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLOSTER!
        })
    
        const id = `notification-channel-${data?.user.id}`
        const channel = pusher.subscribe(id)
        channel.bind('new-notification', (notification: SelectNotification) => {
          setUnreadNotifications( (prevState) =>[notification ,...prevState] )
        })
    
        return () => {
          channel.unbind_all()
          channel.unsubscribe()
        }
    
      }, [data])

  return (
    <>
        {
            unreadNotifications.length
            ? (
                unreadNotifications.map( notification => (
                    <div key={notification.id} className="p-4 rounded-lg shadow-xs shadow-gray-300">
                        <p>
                            { notification.actorName } - {notification.message} {''}
                            <span className="font-bold block">{notification.target}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatCreatedDate(notification.createdAt)}
                        </p>
                    </div>
                ) )
            )
            : (
                <p className="text-center mt-10 text-lg text-gray-600 ">No hay notificaciones</p>
            )
        } 
    </>
  );
}