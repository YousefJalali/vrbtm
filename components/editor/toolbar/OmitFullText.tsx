export default function OmitFullText({
  setOmit,
  isDisabled,
}: {
  setOmit: (state: "omit" | "unOmit") => void
  isDisabled: boolean
}) {
  return (
    <button
      onClick={() => setOmit("omit")}
      disabled={isDisabled}
      className="btn-primary btn-sm  btn  mb-2 "
    >
      Omit
    </button>
  )
}
