import dynamic from "next/dynamic"
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import keyword_extractor from "keyword-extractor"
import { TextEditor } from "@/libs/ui/rich-text-editor"
import { DeltaStatic, Sources } from "quill"
import { Range, UnprivilegedEditor } from "react-quill"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"
import MenuContext from "@/components/MenuContext"

const SelectNotebook = dynamic(
  () => import("@/components/notebook/SelectNotebook"),
  {
    ssr: false,
  }
)

export default function Home() {
  const [difficulty, setDifficulty] = useState(0.8)
  const [text, setText] = useState("")
  const [htmlText, setHtmlText] = useState("")
  const [omittedWords, setOmittedWords] = useState<
    { word: string; index: number; length: number }[]
  >([])
  // const [loading, setLoading] = useState(false)
  const [isEyeOpen, setEye] = useState(true)
  const [isOmit, setOmit] = useState(false)
  const [selectedText, setSelectedText] = useState<{
    text: string
    index: number
    length: number
    isOmitted: boolean
    pos: { x: number; y: number }
  } | null>(null)

  const ref = useRef(null)

  const isWordOmitted = (index: number, length: number) =>
    omittedWords.find(
      (word) => word.index === index && word.length === length
    ) !== undefined

  const omitWord = (word: string, index: number) => {
    if (word.replace(/[^a-zA-Z0-9 ]/g, "").trim().length > 0) {
      if (Math.random() <= difficulty) {
        // @ts-ignore
        ref.current.getEditor().formatText(index, word.length, "mark", true)

        // @ts-ignore
        ref.current
          .getEditor()
          .formatText(index, word.length, { color: "#4E63F2" }, true)
        setOmittedWords((prevState) => [
          ...prevState,
          { word, index, length: word.length },
        ])
      }
    }
  }

  const UnOmitWord = (index: number, length: number) => {
    // @ts-ignore
    ref.current.getEditor().formatText(index, length, "mark", false)
    // @ts-ignore
    ref.current
      .getEditor()
      .formatText(index, length, { color: "inherit" }, true)

    setOmittedWords((prevState) =>
      prevState.filter((word) => word.index !== index)
    )
  }

  const changeHandler = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    // console.log(ref.current.getEditor().formatText(0, 5, "bold", true))
    // console.log({ delta }, editor.getLength())

    setText(editor.getText())
    setHtmlText(value)
  }

  const removeUselessWords = (txt: string) => {
    // console.log(keyword_extractor.getStopwords())
    const txtWithoutUselessWords = keyword_extractor.extract(txt, {
      language: "english",
      remove_duplicates: true,
      remove_digits: false,
      return_changed_case: false,
      // return_chained_words: true,
    })

    return txtWithoutUselessWords
  }

  const toggleOmit = (isVisible: boolean) => {
    setEye(isVisible)

    omittedWords.forEach(({ word, index }) => {
      // @ts-ignore
      ref.current.getEditor().formatText(index, word.length, "mark", isVisible)
    })
  }

  const omit = () => {
    setOmittedWords([])

    clearOmit()

    if (text.length > 0) {
      removeUselessWords(text).forEach((word, i) => {
        omitWord(word, text.search(new RegExp("\\b" + word + "\\b")))
      })
    }
  }

  const clearOmit = () => {
    // @ts-ignore
    ref.current.getEditor().formatText(0, text.length, "mark", false)
    // @ts-ignore
    ref.current
      .getEditor()
      .formatText(0, text.length, { color: "inherit" }, true)
  }

  const clearSelection = () => {
    // @ts-ignore
    ref.current
      .getEditor()
      .formatText(0, text.length, { background: "transparent" }, true)
  }

  const reset = () => {
    setOmit(false)
    clearOmit()
    setSelectedText(null)
    clearSelection()
  }

  const omitHandler = (state: "omit" | "unOmit") => {
    setEye(true)

    if (state === "omit") {
      setOmit(true)
      omit()
    }
    if (state === "unOmit") {
      reset()
    }
  }

  useEffect(() => {
    if (ref.current) {
      if (isOmit) {
        // @ts-ignore
        ref.current.blur()
      } else {
        // @ts-ignore
        ref.current.focus()
      }
    }
  }, [isOmit])

  const difficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.valueAsNumber)

    reset()
  }

  const EditorWrapper = useCallback(
    ({ children }: { children: ReactNode }) =>
      isOmit ? (
        <MenuContext
          selectedText={selectedText}
          omit={omitWord}
          unOmit={UnOmitWord}
        >
          {children}
        </MenuContext>
      ) : (
        <div className="flex flex-1 flex-col">{children}</div>
      ),
    [isOmit, selectedText]
  )

  const changeSelectionHandler = (
    selection: Range,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    if (isOmit && selection) {
      if (selection.length > 0) {
        clearSelection()

        setSelectedText({
          text: editor
            .getText()
            .slice(selection.index, selection.index + selection.length),
          index: selection.index,
          length: selection.length,
          isOmitted: isWordOmitted(selection.index, selection.length),
          pos: {
            x: editor.getBounds(selection.index, selection.length).left,
            y:
              editor.getBounds(selection.index, selection.length).top +
              editor.getBounds(selection.index, selection.length).height,
          },
        })

        // @ts-ignore
        ref.current
          .getEditor()
          .formatText(
            selection.index,
            selection.length,
            { background: "yellow" },
            true
          )

        // @ts-ignore
        // ref.current.getEditor().setSelection(range.index, range.length)
      } else {
        setSelectedText(() => {
          // @ts-ignore
          ref.current
            .getEditor()
            .formatText(0, text.length, { background: "transparent" }, true)

          return null
        })
      }
    }
  }

  return (
    <>
      {/* {showOptions && <Nav />} */}

      <div className="box-border flex flex-1 flex-col rounded-lg bg-base-200 p-2">
        {text.trim().length > 0 && (
          <div className="mb-2 flex h-10 w-full justify-between space-x-2 border-b-2 pb-2">
            <div className="flex space-x-2">
              <div className="flex h-full space-x-2 rounded-lg bg-base-300 p-2 text-sm leading-none text-base-content">
                <span className="leading-none text-base-content">
                  Difficulty
                </span>

                <input
                  value={difficulty}
                  onChange={difficultyHandler}
                  type="range"
                  min="0"
                  max="1"
                  step="0.2"
                  className="range range-primary range-xs"
                />
              </div>

              {isOmit && (
                <button
                  onClick={() => toggleOmit(!isEyeOpen)}
                  className="rounded-lg bg-base-300 p-2"
                >
                  {isEyeOpen ? <RxEyeClosed /> : <RxEyeOpen />}
                </button>
              )}
            </div>

            <div className="flex justify-end">
              {!isOmit && (
                <button
                  onClick={() => omitHandler("omit")}
                  disabled={text.trim().length <= 0}
                  className="btn-primary btn-sm  btn  mb-2 "
                >
                  Omit
                </button>
              )}
            </div>
          </div>
        )}

        <EditorWrapper>
          <TextEditor
            readOnly={isOmit}
            ref={ref}
            value={htmlText}
            onChange={changeHandler}
            placeholder="A brief about the task..."
            className="flex flex-1 flex-col"
            onChangeSelection={changeSelectionHandler}
            // className={`flex flex-1 flex-col  ${isOmit ? "select-none" : ""}`}
          />
        </EditorWrapper>
      </div>

      {isOmit && (
        <div className="mt-3  flex h-10 justify-end space-x-2">
          <button
            onClick={() => omitHandler("unOmit")}
            className="btn-ghost btn"
          >
            cancel
          </button>

          <label htmlFor="add-to-notebook-modal" className="btn-primary btn">
            Add To Notebook
          </label>
        </div>
      )}

      <SelectNotebook />
    </>
  )
}
