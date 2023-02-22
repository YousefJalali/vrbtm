import { FC } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence } from "framer-motion"
import { useNotification } from "@/libs/hooks/useNotification"
import { FiX } from "react-icons/fi"
import Link from "next/link"

export const Notification: FC = () => {
  const { notification, clearNotification } = useNotification()

  if (typeof window === "undefined") return null

  const variants = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  }

  return createPortal
    ? createPortal(
        <>
          {notification && (
            <div className="toast mb-3 px-6 max-sm:w-full max-sm:toast-center">
              <div className={`alert ${variants[notification.variant]}`}>
                <div className="flex w-full items-center justify-between">
                  <span>{notification.message}</span>
                  {notification.link ? (
                    <Link
                      href={notification.link}
                      className="text-sm underline"
                    >
                      View
                    </Link>
                  ) : (
                    <a onClick={clearNotification}>
                      <FiX />
                    </a>
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
