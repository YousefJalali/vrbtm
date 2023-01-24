import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"

export default function Header() {
  return (
    <header className="mb-6 flex h-6 w-full items-center justify-between">
      <h1 className="font-sans text-2xl font-bold leading-none text-primary">
        VRBTM
      </h1>
      <a>
        {/* <a onClick={() => toggleOptions(!showOptions)}> */}
        {/* <HiOutlineAdjustmentsHorizontal className="text-2xl" /> */}
      </a>
    </header>
  )
}
