import { HTMLAttributes, useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"

export function PasswordInput({ ...props }: HTMLAttributes<HTMLInputElement>) {
  const [isPasswordVisible, togglePasswordVisibility] = useState(false)

  return (
    <label className="input-group">
      <input type={isPasswordVisible ? "text" : "password"} {...props} />
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
