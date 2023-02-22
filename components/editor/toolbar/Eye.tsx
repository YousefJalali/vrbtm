import { Dispatch, SetStateAction } from "react"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"

export default function Eye({
  isEyeOpen,
  setEye,
}: {
  isEyeOpen: boolean
  setEye: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <button
      onClick={() => setEye((prevState) => !prevState)}
      className="btn-sm btn"
    >
      {isEyeOpen ? <RxEyeOpen /> : <RxEyeClosed />}
    </button>
  )
}
