import { Flashcard, FlashcardWithNotebook } from "@/libs/types"
import chroma from "chroma-js"
import { ReactNode } from "react"

export default function FlashcardItem({
  flashcard,
  notebookColor,
}: {
  flashcard: Flashcard
  notebookColor: string
}) {
  const color = `${chroma(notebookColor).darken(2)}`
  const bgColor = `${chroma(notebookColor).alpha(0.3)}`

  const Wrapper = ({
    on = false,
    children,
  }: {
    on?: boolean
    children: ReactNode
  }) => (
    <div
      className={`card ${
        on ? "swap-on" : "swap-off"
      } h-32 w-[calc(100vw-3rem)]  sm:w-full`}
      style={{ backgroundColor: bgColor, color }}
    >
      <div className="card-body flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  )

  return (
    <label className="swap swap-flip h-32 w-full sm:w-fit">
      <input type="checkbox" className="w-full" />

      <Wrapper>
        <h2 className="card-title">{flashcard.question}?</h2>
      </Wrapper>

      <Wrapper on>{flashcard.answer}</Wrapper>
    </label>
  )
}
