import dynamic from "next/dynamic"

const SelectNotebook = dynamic(
  () => import("@/components/notebook/SelectNotebook"),
  {
    ssr: false,
  }
)

export default function AddToNotebook() {
  return (
    <>
      <div className="mt-3  flex h-10">
        <label
          htmlFor="add-to-notebook-modal"
          className="btn-primary btn w-full"
        >
          Add To Notebook
        </label>
      </div>

      <SelectNotebook />
    </>
  )
}
