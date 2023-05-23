import { CSSProperties, ReactNode, useRef } from "react"
import { createPortal } from "react-dom"
// import {
//   disableBodyScroll,
//   enableBodyScroll,
//   clearAllBodyScrollLocks,
// } from "body-scroll-lock"
import { AnimatePresence, motion } from "framer-motion"
import { useMedia } from "@/libs/hooks"

// function Content({
//   id,
//   isOpen,
//   children,
//   closeButton
// }: {
//   id: string
//   isOpen: boolean
//   children: ReactNode
//   closeButton?:boolean
// }) {
//   const targetRef = useRef<HTMLDivElement>(null)

//   // console.log(targetRef, id, isOpen)

//   // useEffect(() => {
//   //   if (targetRef.current) {
//   //     if (isOpen) {
//   //       console.log("here")
//   //       disableBodyScroll(targetRef.current)
//   //     } else {
//   //       enableBodyScroll(targetRef.current)
//   //     }
//   //   }

//   //   return () => {
//   //     console.log("cleared")
//   //     // enableBodyScroll(targetRef.current)
//   //     clearAllBodyScrollLocks()
//   //   }
//   // }, [isOpen, id])

//   return <div ref={targetRef}>{children}</div>
// }

export default function Modal({
  isOpen,
  dismiss,
  children,
  id,
  style,
  closeButton,
}: {
  isOpen: boolean
  dismiss: () => void
  children: ReactNode
  id: string
  style?: CSSProperties
  closeButton?: boolean
}) {
  const isMobile = useMedia("(max-width: 768px)")

  if (typeof window === "undefined") return null

  const variants = isMobile
    ? {
        closed: { y: "100%" },
        open: { y: 0 },
      }
    : {
        closed: { scale: 0.5, opacity: 0 },
        open: { scale: 1, opacity: 1 },
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {createPortal(
            <motion.div
              className="modal modal-open modal-bottom transition-none sm:modal-middle"
              style={style}
            >
              <motion.div
                className="absolute top-0 left-0 h-full w-full bg-black"
                onClick={dismiss}
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 0.1 },
                }}
                transition={{ duration: 0.2 }}
                initial="closed"
                animate="open"
                exit="closed"
              />

              <motion.div
                // ref={targetRef}
                className="modal-box relative z-50 transition-none"
                id={`${id}-box`}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ type: "tween", duration: 0.2 }}
              >
                {closeButton && (
                  <button
                    className="btn-outline btn-sm btn-circle btn absolute right-2 top-2"
                    onClick={dismiss}
                  >
                    ✕
                  </button>
                )}
                <div>{children}</div>
              </motion.div>
            </motion.div>,
            document.getElementById("modal") as HTMLDivElement,
            id
          )}
        </>
      )}
    </AnimatePresence>
  )
}
