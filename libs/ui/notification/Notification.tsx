import { FC } from "react"
import { createPortal } from "react-dom"
import { useNotification } from "@/libs/hooks"
import { FiX } from "react-icons/fi"
import {
  TbAlertTriangle,
  TbCircleCheck,
  TbCircleX,
  TbInfoCircle,
} from "react-icons/tb"
import Link from "next/link"
// import { NotificationType } from "@/libs/contexts/NotificationCtx"

export const Notification: FC = () => {
  const { notification, clearNotification } = useNotification()

  if (typeof window === "undefined") return null

  // const notification: NotificationType = {
  //   // message: "event - compiled client",
  //   message:
  //     "event - compiled client and server successfully in 723 ms (284 modules)",
  //   variant: "success",
  //   link: "/",
  // }
  // const clearNotification = () => console.log("cleared")

  const variants = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  }
  const icons = {
    info: <TbInfoCircle size={24} />,
    success: <TbCircleCheck size={24} />,
    warning: <TbAlertTriangle size={24} />,
    error: <TbCircleX size={24} />,
  }

  return createPortal
    ? createPortal(
        <>
          {notification && (
            <div className="toast mb-3 w-full min-w-0 px-6 md:max-w-lg">
              <div className={`alert ${variants[notification.variant]}`}>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2 ">
                    <span>{icons[notification.variant]}</span>

                    <span className="first-letter:uppercase">
                      <span className="line-clamp-2">
                        {notification.message}
                      </span>
                    </span>
                  </div>

                  {notification.link ? (
                    <Link href={notification.link} className="link">
                      View
                    </Link>
                  ) : (
                    <button
                      onClick={clearNotification}
                      className="btn-ghost btn-sm btn-circle btn -mr-2"
                    >
                      <FiX size={24} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>,
        document.getElementById("notification") as HTMLDivElement
      )
    : null
}

export default Notification
