import { ChangeEvent, useEffect, useRef, useState } from "react"
import keyword_extractor from "keyword-extractor"
import { TextEditor } from "@/libs/ui/rich-text-editor"
import { DeltaStatic, Sources } from "quill"
import { UnprivilegedEditor } from "react-quill"
import Header from "@/components/layout/Header"
import Nav from "@/components/layout/Nav"
import { RxEyeClosed, RxEyeOpen, RxReload } from "react-icons/rx"

export default function Home() {
  // const [showOptions, toggleOptions] = useState(false)
  // const [wordLength, setWordLength] = useState(2)
  const [difficulty, setDifficulty] = useState(1)
  // const [exclude, setExclude] = useState("");
  const [text, setText] = useState("")
  const [htmlText, setHtmlText] = useState("")
  const [omittedWords, setOmittedWords] = useState<
    { word: string; index: number }[]
  >([])
  // const [loading, setLoading] = useState(false)
  const [isVisible, setVisibility] = useState(true)
  const [isOmit, setOmit] = useState(false)

  const ref = useRef(null)

  const omitWord = (word: string, index: number) => {
    console.log(word, index)
    if (word.replace(/[^a-zA-Z0-9 ]/g, "").trim().length > 0) {
      if (Math.random() <= difficulty) {
        // @ts-ignore
        ref.current.getEditor().formatText(index, word.length, "mark", true)
        setOmittedWords((prevState) => [...prevState, { word, index }])
      }
    }

    // if (Math.random() <= difficulty) {
    //   // @ts-ignore
    //   ref.current.getEditor().formatText(index, word.length, "mark", true)
    //   setOmittedWords((prevState) => [...prevState, { word, index }])
    // }
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
    // const hyphen = /(?<=\w)-(?=\w)/

    // console.log(txt.replace(hyphen, "?"))

    // const removeSpecialChar = txt
    // .replace(hyphen, " ")
    // .replace(/[^a-zA-Z0-9 ]/g, "")

    // console.log(">", txt)
    // console.log(">", removeSpecialChar)
    // console.log(">", txt.split(" "))
    // console.log(">", txt.indexOf("national"), "national".length)

    // console.log(keyword_extractor.getStopwords())

    const txtWithoutUselessWords = keyword_extractor.extract(
      txt,
      // txt.replace(hyphen, "&#8288;"),
      {
        language: "english",
        remove_digits: false,
        return_changed_case: false,
        remove_duplicates: false,
        // return_chained_words: true,
      }
    )

    // console.log(txtWithoutUselessWords)

    return txtWithoutUselessWords
  }

  // console.log(omittedWords)

  const toggleOmit = (isVisible: boolean) => {
    setVisibility(isVisible)

    omittedWords.forEach(({ word, index }) => {
      // @ts-ignore
      ref.current.getEditor().formatText(index, word.length, "mark", isVisible)
    })
  }

  const omit = () => {
    // console.log("here")
    // setOmit(true)
    setOmittedWords([])

    clearOmit()

    if (text.length > 0) {
      console.log(removeUselessWords(text))
      removeUselessWords(text).forEach((word, i) => {
        omitWord(word, text.search(new RegExp("\\b" + word + "\\b")))
        // omitWord(word, text.indexOf(word))
      })
    }
  }

  const removeFormat = () => {
    // @ts-ignore
    ref.current.getEditor().removeFormat(0, text.length)
  }

  const clearOmit = () => {
    // @ts-ignore
    ref.current.getEditor().formatText(0, text.length, "mark", false)
  }

  const omitHandler = (state: "omit" | "unOmit") => {
    if (state === "omit") {
      setOmit(true)
      omit()
    }
    if (state === "unOmit") {
      setOmit(false)
      clearOmit()
    }

    // setOmit((prevState) => !prevState)
  }

  const difficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.valueAsNumber)
    setOmit(false)
    clearOmit()
  }

  return (
    <main className="min-w-screen relative mx-auto min-h-screen max-w-xl p-6">
      <Header />

      {/* {showOptions && <Nav />} */}

      <div className="box-border rounded-lg bg-base-200 p-2">
        {text.trim().length > 0 && (
          <div className="mb-2 flex h-8 w-full space-x-2 ">
            <div className="dropdown">
              <button className="h-full rounded-lg bg-base-300 p-2 font-sans text-sm leading-none text-base-content">
                <span className="text-base-content">Difficulty</span>
                <span className=" inline-block min-w-[48px]">
                  {difficulty * 100 + "%"}
                </span>
              </button>
              <div
                tabIndex={0}
                className="dropdown-content mt-1 h-fit rounded-lg bg-base-300 p-2 text-primary-content"
              >
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
            </div>

            {isOmit && (
              <button
                onClick={() => toggleOmit(!isVisible)}
                className="rounded-lg bg-base-300 p-2"
              >
                {isVisible ? <RxEyeClosed /> : <RxEyeOpen />}
              </button>
            )}
          </div>
        )}

        <div
          className={
            text.trim().length > 0
              ? `h-[calc(100vh-3rem-3rem-1rem-4rem-2.5rem)]`
              : `h-[calc(100vh-3rem-3rem-1rem-4rem)]`
          }
        >
          <TextEditor
            readOnly={isOmit}
            ref={ref}
            value={htmlText}
            onChange={changeHandler}
            placeholder="A brief about the task..."
            className="h-full"
          />
        </div>
      </div>

      <div className="mt-6 h-10">
        {!isOmit ? (
          <button
            onClick={() => omitHandler("omit")}
            className=" disabled:bg-primary-300 h-full w-full rounded-lg bg-primary font-sans text-base-100"
            disabled={text.trim().length <= 0}
          >
            Omit
          </button>
        ) : (
          <div className="flex h-full space-x-2">
            <button
              onClick={() => omitHandler("unOmit")}
              className=" h-full w-full rounded-lg bg-base-200 font-sans text-base-content "
            >
              cancel
            </button>
            <button className="h-full w-full flex-[0_0_70%] rounded-lg bg-primary font-sans text-base-100">
              Add To Notebook
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
