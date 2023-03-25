import dynamic from "next/dynamic"
import { BsJournalText } from "react-icons/bs"
import { FiPlus } from "react-icons/fi"

const CreateNotebook = dynamic(
  () => import("@/components/notebook/CreateNotebook"),
  {
    ssr: false,
  }
)

export default function EmptyNotebooks() {
  return (
    <div className="flex flex-col items-center bg-base-100 p-6">
      <BsJournalText size={48} className="opacity-60" />
      <h3 className="mt-4 text-center text-lg font-semibold">No Notebooks</h3>
      <p className="mt-2 text-center opacity-60">
        We could not find any notebooks to display here.
      </p>

      <CreateNotebook className="btn-primary btn-sm btn mt-4">
        New Notebook
        <FiPlus size={18} />
      </CreateNotebook>
    </div>
  )
}
