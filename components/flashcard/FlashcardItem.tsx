import { Flashcard } from "@/libs/types"
import chroma from "chroma-js"
import { ReactNode, useMemo } from "react"

export default function FlashcardItem({
  flashcard,
  notebookColor,
}: {
  flashcard: Flashcard
  notebookColor: string
}) {
  const colors = useMemo(
    () => ({
      frontColor: `${chroma(notebookColor)
        .set("hsv.s", "*0.3")
        .set("hsv.v", "0.95")}`,
      backColor: `${chroma(notebookColor)
        .set("hsv.s", "*0.5")
        .set("hsv.v", "0.95")}`,
      text: `${chroma(notebookColor).darken(2)}`,
    }),
    [notebookColor]
  )

  const Wrapper = ({
    on = false,
    children,
  }: {
    on?: boolean
    children: ReactNode
  }) => (
    <div
      className={`card ${
        on ? "swap-on" : "swap-off font-semibold"
      } h-32 w-[calc(100vw-3rem)]  overflow-hidden shadow-lg sm:w-full`}
      style={{
        backgroundColor: on ? colors.frontColor : colors.backColor,
        color: colors.text,
      }}
    >
      <div className="card-body relative flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  )

  return (
    <label className="swap swap-flip h-32 place-content-stretch sm:w-full">
      <input type="checkbox" className="w-full" />

      <Wrapper>{flashcard.question}</Wrapper>

      <Wrapper on>{flashcard.answer}</Wrapper>
    </label>
  )
}
