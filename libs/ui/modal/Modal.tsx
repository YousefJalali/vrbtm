import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"

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
  const targetRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   let elem = document.getElementById("modal")

  //   if (elem !== null && targetRef.current) {
  //     const arr = Array.from(elem.children)

  //     if (arr.some((child) => child.className.includes("modal-open"))) {

  //       disableBodyScroll(targetRef.current)
  //     } else {

  //       enableBodyScroll(targetRef.current)
  //     }
  //   }
  //   return () => {
  //     clearAllBodyScrollLocks()
  //   }
  // }, [isOpen])

  // useEffect(() => {
  //   if (targetRef.current) {
  //     if (isOpen) {
  //       disableBodyScroll(targetRef.current)
  //     } else {
  //       enableBodyScroll(targetRef.current)
  //     }
  //   }

  //   // return () => {
  //   //   clearAllBodyScrollLocks()
  //   // }
  // }, [isOpen])

  if (typeof window === "undefined") return null

  return createPortal
    ? createPortal(
        <>
          {/* if "isOpen" is undefined, modal will be controlled by label */}
          {isOpen === undefined && (
            <input type="checkbox" id={id} className="modal-toggle" />
          )}
          <div
            ref={targetRef}
            className={`modal modal-bottom sm:modal-middle ${
              isOpen === undefined ? "" : isOpen ? "modal-open" : "modal-close"
            }`}
          >
            <label
              htmlFor={id}
              className="absolute top-0 left-0 h-full w-full bg-black opacity-5"
              onClick={dismiss}
            />
            <div className="modal-box" id={`${id}-box`}>
              {isOpen && children}
            </div>
          </div>
        </>,
        document.getElementById("modal") as HTMLDivElement,
        id
      )
    : null
}
