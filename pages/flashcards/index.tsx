import dynamic from "next/dynamic"
import { FiPlus } from "react-icons/fi"

const NewFlashcard = dynamic(
  () => import("@/components/flashcard/NewFlashcard"),
  {
    ssr: false,
  }
)

export default function Flashcards() {
  return (
    <main>
      <input
        type="text"
        placeholder="Search..."
        className="input-bordered input w-full "
      />

      <ul className="mt-6 space-y-6">
        <li>
          <label className="swap swap-flip">
            <input type="checkbox" />

            <div className=" card swap-off w-full bg-base-100 shadow-xl">
              <div className="card-body flex items-center justify-center">
                <h2 className="card-title">Dog</h2>
              </div>
            </div>

            <div className=" card swap-on w-full bg-base-100 shadow-xl">
              <div className="card-body flex items-center justify-center">
                <p className="text-center">
                  If a dog chews shoes whose shoes does he choose?
                </p>
              </div>
            </div>
          </label>
        </li>
      </ul>

      <label
        htmlFor="new-flashcard-modal"
        className="btn-primary btn-circle btn fixed bottom-6 right-6 shadow-xl"
      >
        <FiPlus size={24} />
      </label>
      <NewFlashcard content="" />
    </main>
  )
}
