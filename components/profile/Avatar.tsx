import { useUser } from "@/libs/contexts/AuthCtx"

export default function Avatar({ large = false }: { large?: boolean }) {
  const { user, isLoading } = useUser()

  return (
    <div className="placeholder avatar">
      <div
        className={`rounded-full bg-secondary text-secondary-content ${
          large ? "w-40" : "w-12"
        }`}
      >
        <span className={`${large ? "text-6xl" : ""} uppercase`}>
          {!isLoading && user && typeof user.displayName === "string"
            ? user.displayName.split(" ")[0].split("")[0] +
              (user.displayName.split(" ").length - 1 === 0
                ? ""
                : user.displayName
                    .split(" ")
                    [user.displayName.split(" ").length - 1].split("")[0])
            : ""}
        </span>
      </div>
    </div>
  )
}
