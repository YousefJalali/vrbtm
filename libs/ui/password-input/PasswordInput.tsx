import { ReactNode, useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"

export function PasswordInput({
  children,
}: {
  children: ({ isPasswordVisible }: { isPasswordVisible: boolean }) => ReactNode
}) {
  const [isPasswordVisible, togglePasswordVisibility] = useState(false)

  return (
    <label className="input-group">
      {children({ isPasswordVisible })}
      <span className="p-0">
        <button
          type="button"
          onClick={() => togglePasswordVisibility((prevState) => !prevState)}
          className="p-4"
        >
          {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
        </button>
      </span>
    </label>
  )
}

export default PasswordInput
