import dynamic from "next/dynamic"
import { ReactNode } from "react"

const NewFlashcard = dynamic(
  () => import("@/components/flashcard/NewFlashcard"),
  {
    ssr: false,
  }
)

const MenuContext = ({
  children,
  selectedText,
  omitWord,
}: {
  children: ReactNode
  selectedText: {
    text: string
    index: number
    length: number
    isOmitted: boolean
    pos: { x: number; y: number }
  } | null
  omitWord: (word: string, index: number, length: number, mark: boolean) => void
}) => {
  return (
    <div className="relative">
      <div
        className="relative flex flex-1 flex-col"
        onContextMenu={(e) => {
          e.preventDefault()
        }}
      >
        {children}
      </div>

      {/* @ts-ignore */}
      {selectedText && (
        <div
          className="absolute top-0 left-0"
          style={{ top: selectedText.pos.y, left: selectedText.pos.x }}
        >
          <ul className="menu rounded-box divide-y divide-base-200 bg-base-100">
            <li>
              <a
                onClick={() =>
                  omitWord(
                    selectedText.text,
                    selectedText.index,
                    selectedText.length,
                    !selectedText.isOmitted
                  )
                }
              >
                {selectedText.isOmitted ? "UnOmit" : "Omit"}
              </a>
            </li>
            <li>
              <label htmlFor="new-flashcard-modal">Create flashcard...</label>
              <NewFlashcard content={selectedText?.text || ""} />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
export default MenuContext
