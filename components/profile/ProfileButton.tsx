import Link from "next/link"
import Avatar from "./Avatar"

export default function ProfileButton({
  user,
  onClick,
}: {
  user: any
  onClick: () => void
}) {
  return (
    <Link href="/profile" onClick={onClick}>
      <Avatar />
      <div className="flex flex-col items-start ">
        <span className="text-sm font-light opacity-50">Welcome back,</span>
        <span className="font-semibold first-letter:capitalize">
          {user.displayName.split(" ")[0]}
        </span>
      </div>
    </Link>
  )
}
