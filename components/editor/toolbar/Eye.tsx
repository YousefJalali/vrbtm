import { Dispatch, SetStateAction } from "react"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"

export default function Eye({
  isEyeOpen,
  setEye,
  disabled,
}: {
  isEyeOpen: boolean
  setEye: Dispatch<SetStateAction<boolean>>
  disabled?: boolean
}) {
  return (
    <button
      onClick={() => setEye((prevState) => !prevState)}
      className="btn-secondary btn-sm btn"
      disabled={disabled}
    >
      {isEyeOpen ? <RxEyeOpen /> : <RxEyeClosed />}
    </button>
  )
}
