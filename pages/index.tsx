import { useRef, useState } from "react"
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
  const [difficulty, setDifficulty] = useState(0.1)
  // const [exclude, setExclude] = useState("");
  const [text, setText] = useState("")
  const [htmlText, setHtmlText] = useState("")
  const [omittedWords, setOmittedWords] = useState<
    { word: string; index: number }[]
  >([])
  // const [loading, setLoading] = useState(false)
  const [isVisible, setVisibility] = useState(true)

  const ref = useRef(null)

  const omitWord = (word: string, index: number) => {
    if (Math.random() <= difficulty) {
      // @ts-ignore
      ref.current.getEditor().formatText(index, word.length, "mark", true)
      setOmittedWords((prevState) => [...prevState, { word, index }])
    }
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
    const txtWithoutUselessWords = keyword_extractor.extract(txt, {
      language: "english",
      remove_digits: false,
      return_changed_case: false,
      remove_duplicates: false,
    })

    return txtWithoutUselessWords
  }

  const toggleOmit = (isVisible: boolean) => {
    setVisibility(isVisible)

    omittedWords.forEach(({ word, index }) => {
      // @ts-ignore
      ref.current.getEditor().formatText(index, word.length, "mark", isVisible)
    })
  }

  const omit = () => {
    setOmittedWords([])

    // @ts-ignore
    ref.current.getEditor().removeFormat(0, text.length)

    if (text.length > 0) {
      removeUselessWords(text.replace(/-/g, "‑")).forEach((word, i) =>
        omitWord(word, text.indexOf(word))
      )
    }
  }

  return (
    <main className="min-w-screen mx-auto min-h-screen max-w-xl p-6">
      <Header />

      {/* {showOptions && <Nav />} */}

      {text.trim().length > 0 && (
        <div className="mb-4 flex w-fit space-x-5 rounded-lg bg-layout-level0accent p-2">
          {/* <button
            onClick={omit}
            disabled
            className="disabled:text-content-subtle"
          >
            <RxReload />
          </button> */}

          <button onClick={omit}>Omit</button>

          <button onClick={() => toggleOmit(!isVisible)}>
            {isVisible ? <RxEyeClosed /> : <RxEyeOpen />}
          </button>
        </div>
      )}

      <div className="space-x-2">
        <TextEditor
          ref={ref}
          value={htmlText}
          onChange={changeHandler}
          placeholder="A brief about the task..."
        />
      </div>
    </main>
  )
}
