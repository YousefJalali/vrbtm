import Modal from "@/libs/ui/modal/Modal"
import { useState } from "react"
import Auth from "./Auth"

export default function AuthButton({
  variant = "sign up",
}: {
  variant: "sign up" | "login"
}) {
  const [modal, showModal] = useState(false)
  return (
    <>
      <button
        className={`btn-primary btn ${
          variant === "login" ? "btn-outline" : "text-primary-content"
        }`}
        onClick={() => showModal(true)}
      >
        {variant}
      </button>

      <Modal id="auth-modal" isOpen={modal} dismiss={() => showModal(false)}>
        <Auth login={variant === "login"} />
      </Modal>
    </>
  )
}
