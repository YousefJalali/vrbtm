import { ChangeEvent, useEffect, useRef, useState } from "react"
import { DeltaStatic, Sources } from "quill"
import ReactQuill, { Range, UnprivilegedEditor } from "react-quill"
import { TextEditor } from "@/libs/ui/rich-text-editor"
import MenuContext from "./MenuContext"

import { getTextFromHtml, removeUselessWords } from "@/utils"
import Eye from "./toolbar/Eye"
import DifficultyInput from "./toolbar/Difficulty"
import CreateFlashcard from "../flashcard/CreateFlashcard"
import dynamic from "next/dynamic"

const AddToNotebook = dynamic(
  () => import("@/components/notebook/AddToNotebook"),
  {
    ssr: false,
    loading: () => (
      <button className="btn loading btn-primary mt-3 w-full"></button>
    ),
  }
)

type Props = {
  readOnly?: boolean
  defaultValue?: string
  htmlText: string
  onChange: (value: string) => void
  omitMode?: boolean
  notebookId?: string
}

const Editor = ({
  readOnly = false,
  defaultValue,
  htmlText = "",
  onChange,
  omitMode = false,
  notebookId,
}: Props) => {
  const [difficulty, setDifficulty] = useState(0.8)
  const [text, setText] = useState("")
  const [isEyeOpen, setEye] = useState(false)
  const [isOmit, setOmit] = useState(omitMode)
  const [selectedText, setSelectedText] = useState<{
    text: string
    index: number
    length: number
    isOmitted: boolean
  } | null>(null)

  const editorRef = useRef<ReactQuill>(null)

  useEffect(() => {
    if (editorRef.current) {
      if (isOmit) {
        editorRef.current.blur()
      } else {
        editorRef.current.focus()
      }
    }
  }, [isOmit])

  // useEffect(() => {
  //   if (!readOnly) {
  //     if (editorRef.current) {
  //       editorRef.current.focus()
  //     }
  //   }
  // }, [readOnly])

  // useEffect(() => {
  //   if (readOnly) {
  //     setEye(false)
  //   }
  // }, [readOnly])

  useEffect(() => {
    const extractedText = getTextFromHtml(htmlText)

    if (typeof extractedText === "string") {
      setText(extractedText || "")
    }

    if (htmlText.includes("</mark>")) {
      setOmit(true)
    }
  }, [])

  const isWordOmitted = (index: number, length: number) =>
    editorRef.current?.getEditor().getFormat(index, length).mark as boolean

  // const textHasOmittedWord = () => isWordOmitted(0, text.length)

  const omitWord = (
    word: string,
    index: number,
    length: number,
    mark: boolean
  ) => {
    word
      .trim()
      .split(" ")
      .forEach((w, i) => {
        editorRef.current
          ?.getEditor()
          .formatText(
            i === 0
              ? index
              : index + word.split(" ").slice(0, i).join(" ").length + 1,
            w.length,
            "mark",
            mark
          )
      })
    // editorRef.current?.getEditor().formatText(index, word.length, "mark", mark)
  }

  const omitSelectedWord = () => {
    if (selectedText) {
      omitWord(
        selectedText.text,
        selectedText.index,
        selectedText.length,
        !selectedText.isOmitted
      )
      clearSelection()
    }
  }

  const changeHandler = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    onChange(value)
    setText(editor.getText())
    if (editor.getText().length === 0) {
      reset()
    }
  }

  const changeSelectionHandler = (
    selection: Range,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    if (selection) {
      if (selection.length > 0) {
        setSelectedText({
          text: editor
            .getText()
            .slice(selection.index, selection.index + selection.length),
          index: selection.index,
          length: selection.length,
          isOmitted: isWordOmitted(selection.index, selection.length),
        })
      } else {
        setSelectedText(null)
      }
    }
  }

  const omitText = () => {
    if (text.length > 0) {
      if (!htmlText.includes("</mark>")) {
        const arrToBeOmitted = removeUselessWords(text)

        let startIndex = Math.floor(
          Math.random() *
            (arrToBeOmitted.length -
              Math.floor(arrToBeOmitted.length * difficulty) +
              1)
        )

        let slicedArray = arrToBeOmitted.slice(
          startIndex,
          startIndex + Math.floor(arrToBeOmitted.length * difficulty)
        )

        slicedArray.forEach((word) => {
          if (word.replace(/[^a-zA-Z0-9 ]/g, "").trim().length > 0) {
            omitWord(
              word,
              text.search(new RegExp("\\b" + word + "\\b")), //index
              word.length,
              true
            )
          }
        })

        setOmit(true)
      }
    }
  }

  const clearOmit = () => {
    editorRef.current?.getEditor().formatText(0, text.length, "mark", false)
    setOmit(false)
  }

  const clearSelection = () => {
    editorRef.current?.getEditor().setSelection(0, 0)
  }

  const reset = () => {
    setEye(false)
    clearOmit()
    setSelectedText(null)
  }

  const difficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.valueAsNumber)
    reset()
  }

  return (
    <div
      id="rich-text-editor"
      aria-label="rich-text-editor"
      className="flex h-full flex-col px-6 pb-6"
    >
      <div
        className={`mt-6 box-border flex flex-1 flex-col rounded-lg p-2 ${
          !readOnly ? "bg-base-200" : ""
        }`}
        style={{ padding: readOnly ? 0 : undefined }}
      >
        {!readOnly && text.trim().length > 0 && (
          <div
            className="mb-2 flex h-10 w-full justify-between space-x-2 border-b-2 pb-2 disabled:bg-base-300"
            data-testid="editor-action-bar"
          >
            <div className="flex space-x-2">
              {isOmit && <Eye isEyeOpen={isEyeOpen} setEye={setEye} />}

              {/* Omit selected text */}
              {selectedText && (
                <button
                  onClick={omitSelectedWord}
                  className="btn btn-secondary btn-sm"
                >
                  {selectedText.isOmitted ? "UnOmit" : "Omit"}
                </button>
              )}

              {selectedText && notebookId && (
                <CreateFlashcard
                  className="btn btn-accent btn-sm"
                  notebookId={notebookId}
                  defaultValues={{
                    question: selectedText.text,
                  }}
                >
                  Create flashcard...
                </CreateFlashcard>
              )}
            </div>

            <div className="flex-end flex space-x-2">
              {!isOmit && (
                <DifficultyInput
                  difficulty={difficulty}
                  setDifficulty={difficultyHandler}
                />
              )}

              {isOmit && !selectedText && (
                <button
                  className="btn-outline btn btn-error btn-sm"
                  onClick={reset}
                >
                  Reset
                </button>
              )}

              {/* omit full text */}
              {!isOmit && (
                <button
                  onClick={omitText}
                  disabled={text.trim().length <= 0}
                  className="btn btn-primary btn-sm mb-2"
                >
                  random Omit
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col">
          {/* <MenuContext isOmit={isOmit}> */}
          <TextEditor
            ref={editorRef}
            readOnly={readOnly}
            defaultValue={defaultValue}
            value={htmlText}
            onChange={changeHandler}
            placeholder="A brief about the task..."
            className={`flex flex-1 flex-col [&_mark]:bg-primary
              ${isEyeOpen && "[&_mark]:bg-transparent [&_mark]:text-primary"}
            `}
            onChangeSelection={changeSelectionHandler}
          />
          {/* </MenuContext> */}
        </div>
      </div>

      {!notebookId && isOmit && <AddToNotebook content={htmlText} />}
    </div>
  )
}

export default Editor
