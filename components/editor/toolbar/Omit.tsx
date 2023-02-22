export default function Omit({
  selectedText,
  clearSelection,
  omitWord,
}: {
  selectedText: {
    text: string
    index: number
    length: number
    isOmitted: boolean
    pos: { x: number; y: number }
  }
  clearSelection: () => void
  omitWord: (word: string, index: number, length: number, mark: boolean) => void
}) {
  return (
    <button
      onClick={() => {
        omitWord(
          selectedText.text,
          selectedText.index,
          selectedText.length,
          !selectedText.isOmitted
        )
        clearSelection()
      }}
      className="btn-sm btn"
    >
      {selectedText.isOmitted ? "UnOmit" : "Omit"}
    </button>
  )
}
