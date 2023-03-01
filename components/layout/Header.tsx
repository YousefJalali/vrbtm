import { useEffect, useRef, useState } from "react"

export default function Header({
  title = "VRBTM",
  sectionTitle,
  leftIcon,
  rightIcon,
  sticky = false,
}: {
  sticky?: boolean
  title?: string
  sectionTitle?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
}) {
  const element1Ref = useRef<HTMLDivElement>(null)
  const element2Ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!element1Ref.current || !element2Ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.9,
      }
    )

    observer.observe(element1Ref.current)
    observer.observe(element2Ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <header
        ref={element1Ref}
        className={`min-h-12 z-50 my-3 flex w-full items-center justify-between space-x-6 bg-base-100 px-6 ${
          sticky ? "sticky top-0" : ""
        }`}
      >
        {leftIcon}

        {title.length > 0 ? (
          <div className="prose">
            <h2 className="m-0 text-primary">{title}</h2>
          </div>
        ) : sectionTitle && sectionTitle.length > 0 ? (
          <div
            className={`prose flex-1 truncate ${
              isIntersecting ? "hidden" : ""
            }`}
          >
            <h4 className="truncate text-center">{sectionTitle}</h4>
          </div>
        ) : (
          <div />
        )}

        {rightIcon || (
          <div>
            <label
              htmlFor="side-drawer"
              className="btn-ghost drawer-button btn-sm btn-square btn -mr-1 p-0 lg:hidden"
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
          </div>
        )}
      </header>

      {sectionTitle && (
        <div ref={element2Ref} className="prose px-6 pb-6">
          <h2>{sectionTitle}</h2>
        </div>
      )}
    </>
  )
}
