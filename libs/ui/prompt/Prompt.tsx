import { createPortal } from "react-dom"

export default function Prompt({
  isOpen,
  title,
  description,
  dismiss,
  action,
  actionType = "info",
  actionTitle,
}: {
  isOpen: boolean
  title: string
  description: string
  dismiss: () => void
  action: () => void
  actionType?: "info" | "success" | "warning" | "error"
  actionTitle: string
}) {
  if (typeof window === "undefined") return null

  const variants = {
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
  }

  return createPortal
    ? createPortal(
        <>
          <div
            className={`modal ${
              isOpen === undefined ? "" : isOpen ? "modal-open" : "modal-close"
            }`}
          >
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-5" />
            <div className="modal-box">
              {isOpen && (
                <>
                  <h4 className="text-lg font-bold">{title}</h4>
                  <p className="py-2">{description}</p>
                  <div className="modal-action">
                    <button className="btn-ghost btn-sm btn" onClick={dismiss}>
                      keep
                    </button>
                    <button
                      className={`btn-sm btn ${variants[actionType]}`}
                      onClick={action}
                    >
                      {actionTitle}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>,
        document.getElementById("prompt") as HTMLDivElement
      )
    : null
}
