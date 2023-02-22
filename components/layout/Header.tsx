export default function Header({
  title = "VRBTM",
  leftIcon,
  rightIcon,
}: {
  title?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
}) {
  return (
    <header className="my-3 flex h-12 w-full items-center justify-between pl-6 pr-3">
      {leftIcon}

      {title.length > 0 ? (
        <h1 className="font-sans text-2xl font-bold leading-none text-primary">
          {title}
        </h1>
      ) : (
        <div />
      )}

      {rightIcon || (
        <label
          htmlFor="side-drawer"
          className="btn-ghost drawer-button btn-square btn p-0 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      )}
    </header>
  )
}
