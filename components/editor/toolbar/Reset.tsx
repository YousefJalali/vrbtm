export default function Reset({ resetHandler }: { resetHandler: () => void }) {
  return (
    <button className="btn-outline btn-error btn-sm btn" onClick={resetHandler}>
      Reset
    </button>
  )
}
