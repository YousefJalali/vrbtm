import Modal from "@/libs/ui/modal/Modal"
import Auth from "./Auth"

export default function AuthButton({
  variant = "sign up",
}: {
  variant: "sign up" | "login"
}) {
  return (
    <>
      <label
        htmlFor="auth-modal"
        className={`btn-primary btn ${
          variant === "login" ? "btn-outline" : "text-primary-content"
        }`}
      >
        {variant}
      </label>

      <Modal id="auth-modal">
        <Auth login={variant === "login"} />
      </Modal>
    </>
  )
}
