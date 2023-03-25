export default function Avatar({
  name,
  large = false,
}: {
  name: string
  large?: boolean
}) {
  return (
    <div className="placeholder avatar">
      <div
        className={`rounded-full bg-neutral-focus text-neutral-content ${
          large ? "w-40" : "w-12"
        }`}
      >
        <span className={`${large ? "text-6xl" : ""}`}>
          {name.split(" ")[0].split("")[0] +
            name.split(" ")[name.split(" ").length - 1].split("")[0]}
        </span>
      </div>
    </div>
  )
}
