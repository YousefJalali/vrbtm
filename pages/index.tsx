import { ChangeEvent, useEffect, useRef, useState } from "react"
import keyword_extractor from "keyword-extractor"
import { TextEditor } from "@/libs/ui/rich-text-editor"
import { DeltaStatic, Sources } from "quill"
import { UnprivilegedEditor } from "react-quill"
import { RxEyeClosed, RxEyeOpen, RxReload } from "react-icons/rx"
import ReactSelect from "@/libs/ui/select/Select"

export default function Home() {
  // const [showOptions, toggleOptions] = useState(false)
  // const [wordLength, setWordLength] = useState(2)
  const [difficulty, setDifficulty] = useState(0.8)
  // const [exclude, setExclude] = useState("");
  const [text, setText] = useState("")
  const [htmlText, setHtmlText] = useState("")
  const [omittedWords, setOmittedWords] = useState<
    { word: string; index: number }[]
  >([])
  // const [loading, setLoading] = useState(false)
  const [isEyeOpen, setEye] = useState(true)
  const [isOmit, setOmit] = useState(false)

  const ref = useRef(null)

  const omitWord = (word: string, index: number) => {
    // console.log(word)
    if (word.replace(/[^a-zA-Z0-9 ]/g, "").trim().length > 0) {
      if (Math.random() <= difficulty) {
        // console.log(word)
        // @ts-ignore
        ref.current.getEditor().formatText(index, word.length, "mark", true)
        // @ts-ignore
        ref.current
          .getEditor()
          .formatText(index, word.length, { color: "#4E63F2" }, true)
        setOmittedWords((prevState) => [...prevState, { word, index }])
      }
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

  const removeFormat = () => {
    // @ts-ignore
    ref.current.getEditor().removeFormat(0, text.length)
  }

  const clearOmit = () => {
    // @ts-ignore
    ref.current.getEditor().formatText(0, text.length, "mark", false)
    // @ts-ignore
    ref.current
      .getEditor()
      .formatText(0, text.length, { color: "inherit" }, true)
  }

  const omitHandler = (state: "omit" | "unOmit") => {
    setEye(true)

    if (state === "omit") {
      setOmit(true)
      omit()
    }
    if (state === "unOmit") {
      setOmit(false)
      clearOmit()
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
    setOmit(false)
    clearOmit()
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

        <div className="flex flex-1 flex-col">
          <TextEditor
            readOnly={isOmit}
            ref={ref}
            value={htmlText}
            onChange={changeHandler}
            placeholder="A brief about the task..."
            className={`flex flex-1 flex-col  ${isOmit ? "select-none" : ""}`}
          />
        </div>
      </div>

      {/* <div className="mt-6 h-10"> */}
      {isOmit && (
        <div className="mt-3  flex h-10 justify-end space-x-2">
          <button
            onClick={() => omitHandler("unOmit")}
            className="btn-ghost btn"
          >
            cancel
          </button>

          <label htmlFor="my-modal-6" className="btn-primary btn">
            Add To Notebook
          </label>
          {/* <button className="h-full w-full flex-[0_0_70%] rounded-lg bg-primary font-sans text-base-100">
            Add To Notebook
          </button> */}
        </div>
      )}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div
        // htmlFor="my-modal-6"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add to Notebook</h3>
          <p className="py-4">
            Select a notebook to add the paragraph to or create a new notebook
          </p>

          {/* <ReactSelect /> */}

          <div className="dropdown dropdown-top w-full">
            <label
              tabIndex={0}
              className="btn m-0 w-full border-0 bg-transparent p-0"
            >
              <input
                readOnly
                type="text"
                placeholder="Type here"
                value="hola"
                className="input-bordered input w-full text-base-content"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>

          {/* <select className="select-bordered select w-full ">
            <option disabled selected>
              Who shot first?
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select> */}

          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn-ghost btn">
              Cancel
            </label>
            <button className="btn-primary btn">add</button>
          </div>
        </div>
      </div>
    </>
  )
}
