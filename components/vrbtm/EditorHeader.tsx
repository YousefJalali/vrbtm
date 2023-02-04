import dynamic from "next/dynamic"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"

const NewFlashcard = dynamic(
  () => import("@/components/flashcard/NewFlashcard"),
  {
    ssr: false,
  }
)

export default function EditorHeader({
  text,
  isOmit,
  setOmit,
  isEyeOpen,
  setEye,
  isFirstOmit,
  difficulty,
  setDifficulty,
  reset,
  selectedText,
  omitWord,
}: {
  text: string
  isOmit: boolean
  setOmit: (state: "omit" | "unOmit") => void
  isEyeOpen: boolean
  setEye: Dispatch<SetStateAction<boolean>>
  isFirstOmit: boolean
  difficulty: number
  setDifficulty: (e: ChangeEvent<HTMLInputElement>) => void
  reset: () => void
  selectedText: {
    text: string
    index: number
    length: number
    isOmitted: boolean
    pos: { x: number; y: number }
  } | null
  omitWord: (word: string, index: number, length: number, mark: boolean) => void
}) {
  return (
    <div className="mb-2 flex h-10 w-full justify-between space-x-2 border-b-2 pb-2">
      {isOmit ? (
        <div className="flex space-x-2">
          <button
            onClick={() => setEye((prevState) => !prevState)}
            className="btn-sm btn"
          >
            {isEyeOpen ? <RxEyeOpen /> : <RxEyeClosed />}
          </button>

          {selectedText && (
            <>
              <button
                onClick={() =>
                  omitWord(
                    selectedText.text,
                    selectedText.index,
                    selectedText.length,
                    !selectedText.isOmitted
                  )
                }
                className="btn-sm btn"
              >
                {selectedText.isOmitted ? "UnOmit" : "Omit"}
              </button>

              <label className="btn-sm btn" htmlFor="new-flashcard-modal">
                Create flashcard...
              </label>

              <NewFlashcard content={selectedText?.text || ""} />
            </>
          )}
        </div>
      ) : (
        <div />
      )}

      <div className="flex-end flex space-x-2">
        {isFirstOmit ? (
          <div
            className={`flex h-full space-x-2 rounded-lg bg-base-300 p-2 text-sm leading-none text-base-content`}
          >
            <span className="leading-none text-base-content">Difficulty</span>

            <input
              value={difficulty}
              onChange={setDifficulty}
              type="range"
              min="0"
              max="1"
              step="0.2"
              className="range range-primary range-xs"
            />
          </div>
        ) : !selectedText ? (
          <button className="btn-outline btn-error btn-sm btn" onClick={reset}>
            Reset
          </button>
        ) : (
          <div />
        )}

        {!isOmit && (
          <button
            onClick={() => setOmit("omit")}
            disabled={text.trim().length <= 0}
            className="btn-primary btn-sm  btn  mb-2 "
          >
            Omit
          </button>
        )}
      </div>
    </div>
  )
}
