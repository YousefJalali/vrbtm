import { ColorChangeHandler, TwitterPicker } from "react-color"
import { FiCircle } from "react-icons/fi"

export default function ColorInput({
  color,
  onChange,
}: {
  color: string
  onChange: ColorChangeHandler
}) {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="input-bordered input flex items-center">
        <FiCircle fill={color} color={color} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content overflow-hidden rounded-lg shadow"
      >
        <TwitterPicker color={color} onChange={onChange} />
      </div>
    </div>
  )
}
