import { FiHome } from "react-icons/fi"

export default function Nav() {
  return (
    <nav className="flex w-12 bg-base-200">
      <ul className="mt-[calc(1rem+3rem)] w-full ">
        <li className="active h-12 rounded-tl-2xl rounded-bl-2xl bg-base-100">
          <a className=" flex h-full w-full items-center justify-center ">
            <FiHome className="h-6 w-6 stroke-primary" />
          </a>
        </li>
        <li className="active h-12 ">
          <a className=" flex h-full w-full items-center justify-center ">
            <FiHome className="h-6 w-6 stroke-base-100" />
          </a>
        </li>
      </ul>
    </nav>
  )
}
