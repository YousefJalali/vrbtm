import { ChangeEvent, useEffect, useRef, useState } from "react"
import { DeltaStatic, Sources } from "quill"
import ReactQuill, { Range, UnprivilegedEditor } from "react-quill"
import { TextEditor } from "@/libs/ui/rich-text-editor"
import MenuContext from "./MenuContext"

import { getTextFromHtml, removeUselessWords } from "@/utils"
import Eye from "./toolbar/Eye"
import Omit from "./toolbar/Omit"
import DifficultyInput from "./toolbar/Difficulty"
import Reset from "./toolbar/Reset"
import OmitFullText from "./toolbar/OmitFullText"
import CreateFlashcard from "../flashcard/CreateFlashcard"
import dynamic from "next/dynamic"

const AddToNotebook = dynamic(
  () => import("@/components/notebook/AddToNotebook"),
  {
    ssr: false,
    loading: () => (
      <button className="btn-primary loading btn mt-3 w-full"></button>
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
  const [isFirstOmit, setFirstOmit] = useState(true)
  const [selectedText, setSelectedText] = useState<{
    text: string
    index: number
    length: number
    isOmitted: boolean
    pos: { x: number; y: number }
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

  useEffect(() => {
    if (!readOnly) {
      if (editorRef.current) {
        editorRef.current.focus()
      }
    }
  }, [readOnly])

  useEffect(() => {
    if (htmlText.includes("</mark>") || isOmit) {
      setFirstOmit(false)
    }
  }, [htmlText, isOmit])

  useEffect(() => {
    if (readOnly) {
      setEye(false)
    }
  }, [readOnly])

  useEffect(() => {
    const extractedText = getTextFromHtml(htmlText)

    if (typeof extractedText === "string") {
      setText(extractedText || "")
    }
  }, [htmlText])

  const isWordOmitted = (index: number, length: number) =>
    editorRef.current?.getEditor().getFormat(index, length).mark

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
    editorRef.current?.getEditor().formatText(index, word.length, "mark", mark)
  }

  const changeHandler = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    onChange(value)
    setText(editor.getText())
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
    editorRef.current?.getEditor().formatText(0, text.length, "mark", false)
  }

  const clearSelection = () => {
    editorRef.current?.getEditor().setSelection(0, 0)
  }

  const resetHandler = () => {
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

  const difficultyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.valueAsNumber)

    resetHandler()
  }

  return (
    <div
      id="rich-text-editor"
      aria-label="rich-text-editor"
      className="flex h-full flex-col px-6 pb-6"
    >
      <div
        className={`mt-6 box-border flex flex-1 flex-col rounded-lg p-2 ${
          readOnly ? "p-0" : "bg-base-200"
        }`}
      >
        {!readOnly && text.trim().length > 0 && (
          <div
            className="mb-2 flex h-10 w-full justify-between space-x-2 border-b-2 pb-2"
            data-testid="editor-action-bar"
          >
            <div className="flex space-x-2">
              {isOmit && <Eye isEyeOpen={isEyeOpen} setEye={setEye} />}

              {isOmit && selectedText && (
                <Omit
                  selectedText={selectedText}
                  clearSelection={clearSelection}
                  omitWord={omitWord}
                />
              )}

              {isOmit && selectedText && notebookId && (
                <CreateFlashcard
                  className="btn-sm btn"
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
              {isFirstOmit && (
                <DifficultyInput
                  difficulty={difficulty}
                  setDifficulty={difficultyHandler}
                />
              )}

              {!isFirstOmit && !selectedText && (
                <Reset resetHandler={resetHandler} />
              )}

              {!isOmit && (
                <OmitFullText
                  setOmit={omitHandler}
                  isDisabled={text.trim().length <= 0}
                />
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
