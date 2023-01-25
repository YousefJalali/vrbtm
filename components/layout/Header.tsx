import { useState } from "react"
import { FiMenu } from "react-icons/fi"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"

export default function Header() {
  const [isVisible, setVisibility] = useState(false)

  return (
    <header className="mb-6 flex h-6 w-full items-center justify-between">
      <h1 className="font-sans text-2xl font-bold leading-none text-primary">
        VRBTM
      </h1>
    </header>
  )
}
