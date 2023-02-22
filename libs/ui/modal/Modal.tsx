import { ReactNode } from "react"
import { createPortal } from "react-dom"

export default function Modal({
  isOpen,
  dismiss,
  children,
  id,
}: {
  isOpen: boolean
  dismiss: () => void
  children: ReactNode
  id: string
}) {
  if (typeof window === "undefined") return null

  return createPortal
    ? createPortal(
        <>
          {/* if "isOpen" is undefined, modal will be controlled by label */}
          {isOpen === undefined && (
            <input type="checkbox" id={id} className="modal-toggle" />
          )}
          <div
            className={`modal modal-bottom sm:modal-middle ${
              isOpen === undefined ? "" : isOpen ? "modal-open" : "modal-close"
            }`}
          >
            <label
              htmlFor={id}
              className="absolute top-0 left-0 h-full w-full bg-black opacity-5"
              onClick={dismiss}
            />
            <div className="modal-box">{children}</div>
          </div>
        </>,
        document.getElementById("modal") as HTMLDivElement,
        id
      )
    : null
}
