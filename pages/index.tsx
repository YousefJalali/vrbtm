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
import { Delta, DeltaStatic, Sources } from "quill"
import { Range, UnprivilegedEditor } from "react-quill"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"
import { TextEditor } from "@/libs/ui/rich-text-editor"
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
  // const [omittedWords, setOmittedWords] = useState<
  //   { word: string; index: number; length: number }[]
  // >([])
  // const [loading, setLoading] = useState(false)
  const [isEyeOpen, setEye] = useState(false)
  const [isOmit, setOmit] = useState(false)
  const [firstOmit, setFirstOmit] = useState(true)
  const [selectedText, setSelectedText] = useState<{
    text: string
    index: number
    length: number
    isOmitted: boolean
    pos: { x: number; y: number }
  } | null>(null)

  const ref = useRef(null)

  useEffect(() => {
    if (htmlText.includes("</mark>") || isOmit) {
      setFirstOmit(false)
    }
  }, [htmlText, isOmit])

  const isWordOmitted = (index: number, length: number) =>
    // @ts-ignore
    ref.current.getEditor().getFormat(index, length).mark

  const randomOmit = (word: string, index: number) => {
    if (word.replace(/[^a-zA-Z0-9 ]/g, "").trim().length > 0) {
      if (Math.random() <= difficulty) {
        omitWord(word, index, word.length, true)
      }
    }
  }

  const omitWord = (
    word: string,
    index: number,
    length: number,
    mark: boolean
  ) => {
    // @ts-ignore
    ref.current.getEditor().formatText(index, word.length, "mark", mark)

    clearSelection()
  }

  // const getOmittedWords = () => {
  //   let words: { word: string; index: number; length: number }[] = []

  //   const textWithMarks = htmlText.match(/<mark[^>]*>(.*?)<\/mark>/g)

  //   if (!textWithMarks) return

  //   textWithMarks.map((val, i) => {
  //     const omit = {
  //       word: val.match(/>(.*?)</g)?.[0].split(/<|>/)[1] || "",
  //       index: Number(val.match(/"(.*?)"/g)?.[0].replace(/"/g, "")) || 0,
  //       length: 0,
  //     }
  //     omit.length = omit.word.length

  //     words.push(omit)
  //   })

  //   setOmittedWords(words)
  // }

  const changeHandler = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    // console.log(ref.current.getEditor().formatText(0, 5, "bold", true))
    // console.log({ delta }, editor.getLength())

    console.log(value)

    setText(editor.getText())
    setHtmlText(value)
  }

  const removeUselessWords = (txt: string) => {
    const txtWithoutUselessWords = keyword_extractor.extract(txt, {
      language: "english",
      remove_duplicates: true,
      remove_digits: false,
      return_changed_case: false,
      // return_chained_words: true,
    })

    return txtWithoutUselessWords
  }

  const omitText = () => {
    if (text.length > 0) {
      if (!htmlText.includes("</mark>")) {
        removeUselessWords(text).forEach((word) => {
          randomOmit(word, text.search(new RegExp("\\b" + word + "\\b")))
        })
      }
    }
  }

  const clearOmit = () => {
    setOmit(false)

    // @ts-ignore
    ref.current.getEditor().formatText(0, text.length, "mark", false)
  }

  const clearSelectionFormat = () => {
    // @ts-ignore
    ref.current
      .getEditor()
      .formatText(0, text.length, { background: "transparent" }, true)
  }

  const clearSelection = () => {
    setSelectedText(null)
    clearSelectionFormat()
  }

  const reset = () => {
    setFirstOmit(true)
    setEye(false)
    clearOmit()
    clearSelection()
  }

  const omitHandler = (state: "omit" | "unOmit") => {
    if (state === "omit") {
      setOmit(true)
      omitText()
    }
    if (state === "unOmit") {
      setOmit(false)
      setEye(false)
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

  const changeSelectionHandler = (
    selection: Range,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    if (isOmit && selection) {
      if (selection.length > 0) {
        clearSelectionFormat()

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

  const EditorWrapper = useCallback(
    ({ children }: { children: ReactNode }) =>
      isOmit ? (
        <MenuContext selectedText={selectedText} omitWord={omitWord}>
          {children}
        </MenuContext>
      ) : (
        <div className="flex flex-1 flex-col">{children}</div>
      ),
    [isOmit, selectedText]
  )

  return (
    <>
      {/* {showOptions && <Nav />} */}

      <div className="box-border flex flex-1 flex-col rounded-lg bg-base-200 p-2">
        {text.trim().length > 0 && (
          <div className="mb-2 flex h-10 w-full justify-between space-x-2 border-b-2 pb-2">
            {isOmit ? (
              <button
                onClick={() => setEye((prevState) => !prevState)}
                className="rounded-lg bg-base-300 p-2"
              >
                {isEyeOpen ? <RxEyeOpen /> : <RxEyeClosed />}
              </button>
            ) : (
              <div />
            )}

            <div className="flex-end flex space-x-2">
              {firstOmit ? (
                <div
                  className={`flex h-full space-x-2 rounded-lg bg-base-300 p-2 text-sm leading-none text-base-content`}
                >
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
              ) : (
                <button
                  className="btn-outline btn-error btn-sm btn"
                  onClick={reset}
                >
                  Reset
                </button>
              )}

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
            // readOnly={isOmit}
            ref={ref}
            value={htmlText}
            onChange={changeHandler}
            placeholder="A brief about the task..."
            className={`flex flex-1 flex-col 
            ${
              (!isEyeOpen && isOmit && "[&_mark]:bg-primary") ||
              "[&_mark]:bg-transparent [&_mark]:text-inherit"
            }
            ${!firstOmit && "[&_mark]:text-primary"}
            `}
            onChangeSelection={changeSelectionHandler}
            // className={`flex flex-1 flex-col  ${isOmit ? "select-none" : ""}`}
          />
        </EditorWrapper>
      </div>

      {isOmit && (
        <div className="mt-3  flex h-10">
          {/* <button
            onClick={() => omitHandler("unOmit")}
            className="btn-ghost btn"
          >
            cancel
          </button> */}

          <label
            htmlFor="add-to-notebook-modal"
            className="btn-primary btn w-full"
          >
            Add To Notebook
          </label>
        </div>
      )}

      <SelectNotebook />
    </>
  )
}
