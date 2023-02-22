import { useContext } from "react"
import NotificationCtx from "../contexts/NotificationCtx"

export const useNotification = () => {
  const { notification, setNotification, clearNotification } =
    useContext(NotificationCtx)

  return { notification, setNotification, clearNotification }
}
