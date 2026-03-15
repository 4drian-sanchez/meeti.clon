import { formatCreatedDate } from "@/src/shared/utils/date";
import { SelectNotification } from "../../types/notification.types";

type Props = {
    notifications: SelectNotification[]
}


export default function NotificationsList( {notifications} : Props ) {
  return (
    <>
        {
            notifications.length
            ? (
                notifications.map( notification => (
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