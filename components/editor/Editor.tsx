import { ChangeEvent, useEffect, useRef, useState } from "react"
import keyword_extractor from "keyword-extractor"
import { DeltaStatic, Sources } from "quill"
import ReactQuill, { Range, UnprivilegedEditor } from "react-quill"
import { TextEditor } from "@/libs/ui/rich-text-editor"
import MenuContext from "./MenuContext"
import AddToNotebook from "../notebook/AddToNotebook"
import EditorHeader from "./EditorHeader"

export default function Editor({
  readOnly = false,
  defaultValue = "",
  omitMode = false,
  notebook = false,
}) {
  const [difficulty, setDifficulty] = useState(0.8)
  const [text, setText] = useState("")
  const [htmlText, setHtmlText] = useState(defaultValue)
  const [isEyeOpen, setEye] = useState(false)
  const [isOmit, setOmit] = useState(omitMode)
  const [isFirstOmit, setFirstOmit] = useState(true)
  const [selectedText, setSelectedText] = useState<{
    text: string
    index: number
    length: number
    isOmitted: boolean
    pos: { x: number; y: number }
  } | null>(null)

  const ref = useRef<ReactQuill>(null)

  useEffect(() => {
    if (htmlText.includes("</mark>") || isOmit) {
      setFirstOmit(false)
    }
  }, [htmlText, isOmit])

  const isWordOmitted = (index: number, length: number) =>
    ref.current?.getEditor().getFormat(index, length).mark

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
    ref.current?.getEditor().formatText(index, word.length, "mark", mark)
  }

  const changeHandler = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    setText(editor.getText())
    setHtmlText(value)
  }

  const changeSelectionHandler = (
    selection: Range,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    if (isOmit && selection) {
      if (selection.length > 0) {
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
      } else {
        setSelectedText(null)
      }
    }
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

    ref.current?.getEditor().formatText(0, text.length, "mark", false)
  }
  const clearSelection = () => {
    ref.current?.getEditor().setSelection(0, 0)
  }

  const reset = () => {
    setFirstOmit(true)
    setEye(false)
    clearOmit()
    setSelectedText(null)
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
        ref.current.blur()
      } else {
        ref.current.focus()
      }
    }
  }, [isOmit])

  const difficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.valueAsNumber)

    reset()
  }

  return (
    <>
      <div
        className={`box-border flex flex-1 flex-col rounded-lg p-2 ${
          readOnly ? "border" : "bg-base-200"
        }`}
      >
        {text.trim().length > 0 && (
          <EditorHeader
            readOnly={readOnly}
            text={text}
            isOmit={isOmit}
            setOmit={omitHandler}
            isEyeOpen={isEyeOpen}
            setEye={setEye}
            isFirstOmit={isFirstOmit}
            difficulty={difficulty}
            setDifficulty={difficultyHandler}
            reset={reset}
            selectedText={selectedText}
            clearSelection={clearSelection}
            omitWord={omitWord}
          />
        )}

        <MenuContext isOmit={isOmit}>
          <TextEditor
            ref={ref}
            readOnly={readOnly}
            value={htmlText}
            onChange={changeHandler}
            placeholder="A brief about the task..."
            className={`flex flex-1 flex-col 
            ${
              (!isEyeOpen && isOmit && "[&_mark]:bg-primary") ||
              "[&_mark]:bg-transparent [&_mark]:text-inherit"
            }
            ${!isFirstOmit && "[&_mark]:text-primary"}
            `}
            onChangeSelection={changeSelectionHandler}
          />
        </MenuContext>
      </div>

      {!notebook && isOmit && <AddToNotebook content={htmlText} />}
    </>
  )
}
