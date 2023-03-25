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
      <Avatar name={user.displayName} />
      <div className="flex flex-col items-start ">
        <span className="text-sm font-light opacity-50">Welcome back,</span>
        <span className="font-semibold">{user.displayName}</span>
      </div>
    </Link>
  )
}
