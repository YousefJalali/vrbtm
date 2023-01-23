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

    const txtWithoutUselessWords = keyword_extractor.extract(txt, {
      language: "english",
      remove_digits: false,
      return_changed_case: false,
      remove_duplicates: false,
    })

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

    // @ts-ignore
    ref.current.getEditor().removeFormat(0, text.length)

    if (text.length > 0) {
      console.log(removeUselessWords(text))
      removeUselessWords(text).forEach((word, i) =>
        omitWord(word, text.indexOf(word))
      )
    }
  }

  const clearOmit = () => {
    // @ts-ignore
    ref.current.getEditor().removeFormat(0, text.length)
  }

  const omitHandler = () => {
    if (!isOmit) {
      omit()
    } else {
      clearOmit()
    }

    setOmit((prevState) => !prevState)
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

      {text.trim().length > 0 && (
        <div className="mb-4 flex w-fit space-x-5">
          {/* <button
            onClick={omit}
            disabled
            className="disabled:text-content-subtle"
          >
            <RxReload />
          </button> */}

          <div className="relative ">
            <label
              htmlFor="omit"
              className={`w-ful h-full cursor-pointer select-none rounded-lg px-3 py-1 ${
                isOmit
                  ? "border-2 border-brand-primary bg-brand-primary-300 text-layout-level0"
                  : "bg-layout-level1"
              }`}
            >
              Omit
            </label>
            <input
              id="omit"
              type="checkbox"
              className="absolute top-0 left-0 h-0 w-0"
              checked={isOmit}
              onChange={omitHandler}
            />
          </div>

          <div>
            <input
              type="range"
              value={difficulty}
              onChange={difficultyHandler}
              max={1}
              step={0.2}
            />
          </div>

          {/* <button onClick={omit}>Omit</button> */}

          <button onClick={() => toggleOmit(!isVisible)}>
            {isVisible ? <RxEyeClosed /> : <RxEyeOpen />}
          </button>
        </div>
      )}

      <div className="space-x-2">
        <TextEditor
          readOnly={isOmit}
          ref={ref}
          value={htmlText}
          onChange={changeHandler}
          placeholder="A brief about the task..."
        />
      </div>
    </main>
  )
}
