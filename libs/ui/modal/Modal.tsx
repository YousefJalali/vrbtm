import { ReactNode } from "react"
import { createPortal } from "react-dom"

export default function Modal({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) {
  if (typeof window === "undefined") return null

  return createPortal
    ? createPortal(
        <>
          <input type="checkbox" id={id} className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <label
              htmlFor={id}
              className="absolute top-0 left-0 h-full w-full bg-black opacity-5"
            />
            <div className="modal-box">{children}</div>
          </div>
        </>,
        document.getElementById("modal") as HTMLDivElement,
        id
      )
    : null
}
