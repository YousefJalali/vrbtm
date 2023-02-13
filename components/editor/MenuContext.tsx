import { ReactNode } from "react"

const MenuContext = ({
  children,
  isOmit,
}: {
  children: ReactNode
  isOmit: boolean
}) => {
  if (!isOmit) {
    return <div className="flex flex-1 flex-col">{children}</div>
  }

  return (
    <div
      className="relative flex flex-1 flex-col"
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      {children}
    </div>
  )
}
export default MenuContext
