import {
  CSSProperties,
  ReactNode,
  StyleHTMLAttributes,
  useEffect,
  useRef,
} from "react"
import { createPortal } from "react-dom"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"
import { AnimatePresence, motion } from "framer-motion"
import { useMedia } from "@/libs/hooks"

export default function Modal({
  isOpen,
  dismiss,
  children,
  id,
  style,
}: {
  isOpen: boolean
  dismiss: () => void
  children: ReactNode
  id: string
  style?: CSSProperties
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
              ref={targetRef}
              className={`modal modal-open modal-bottom transition-none sm:modal-middle`}
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
                className="modal-box z-50 transition-none"
                id={`${id}-box`}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ type: "tween", duration: 0.2 }}
              >
                {children}
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
