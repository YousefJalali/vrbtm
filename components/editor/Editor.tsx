import { ChangeEvent, useEffect, useRef, useState } from "react"
import { DeltaStatic, Sources } from "quill"
import ReactQuill, { Range, UnprivilegedEditor } from "react-quill"
import { TextEditor } from "@/libs/ui/rich-text-editor"
import MenuContext from "./MenuContext"

import { getTextFromHtml, removeUselessWords } from "@/utils"
import CreateFlashcard from "../flashcard/CreateFlashcard"
import dynamic from "next/dynamic"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"
import { BsCardText } from "react-icons/bs"

const AddToNotebook = dynamic(
  () => import("@/components/notebook/AddToNotebook"),
  {
    ssr: false,
    loading: () => (
      <button className="loading btn-primary btn mt-3 w-full"></button>
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
  title?: string
}

const Editor = ({
  readOnly: isReadOnly = false,
  defaultValue,
  htmlText = "",
  onChange,
  omitMode = false,
  notebookId,
  title = "",
}: Props) => {
  const [readOnly, setReadOnly] = useState(isReadOnly)
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
    setReadOnly(isReadOnly)
  }, [isReadOnly])

  // useEffect(() => {
  //   if (editorRef.current) {
  //     if (isOmit) {
  //       editorRef.current.blur()
  //     } else {
  //       editorRef.current.focus()
  //     }
  //   }
  // }, [isOmit])

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

  const textHasOmittedWord = () => isWordOmitted(0, text.length)

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
      setOmit(true)
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
      if (textHasOmittedWord()) {
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
    <div className="drawer drawer-end drawer-mobile">
      <input
        id="editor-control-side"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {!readOnly && text.trim().length > 0 && !notebookId && (
          <label
            htmlFor="editor-control-side"
            className="btn-primary drawer-button btn-sm btn absolute right-16 top-[26px] z-50 lg:hidden"
          >
            Omit
          </label>
        )}
        <div className="h-full">
          {title && (
            <div className="prose px-6">
              <h1>{title}</h1>
            </div>
          )}
          <TextEditor
            ref={editorRef}
            readOnly={readOnly || (isOmit && !isEyeOpen)}
            defaultValue={defaultValue}
            value={htmlText}
            onChange={changeHandler}
            placeholder="Type or paste your text here"
            className={`h-full p-6 [&_mark]:bg-primary
              ${isEyeOpen && "[&_mark]:bg-transparent [&_mark]:text-primary"}
            `}
            onChangeSelection={changeSelectionHandler}
          />
        </div>
      </div>
      {!readOnly && (
        <div className="drawer-side">
          <label
            htmlFor="editor-control-side"
            className="drawer-overlay"
            style={{ opacity: 0 }}
          ></label>
          <div className="w-80 rounded-tl-2xl bg-base-200 text-base-content shadow-lg md:w-72">
            {/* <div className="absolute right-0 -top-6 z-50 h-16 w-full bg-primary" /> */}
            {text.trim().length <= 0 ? (
              <span className="hidden p-6 md:block">
                Start writing to omit words.
              </span>
            ) : (
              <div className="p-4 pr-6" data-testid="editor-action-bar">
                <div className="flex h-full w-full flex-col gap-2">
                  <div className="flex h-full w-full flex-col gap-3 rounded-lg bg-base-300 p-2">
                    {/* difficulty */}
                    <div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 rounded-lg bg-base-300 p-2 text-sm leading-none text-base-content">
                          <span className="leading-none text-base-content">
                            Difficulty
                          </span>

                          <input
                            value={difficulty}
                            onChange={difficultyHandler}
                            type="range"
                            min="0.6"
                            max="1"
                            step="0.2"
                            className="range range-primary range-xs"
                          />
                        </div>

                        <button
                          onClick={omitText}
                          disabled={text.trim().length <= 0}
                          className="btn-secondary btn-sm btn"
                        >
                          random Omit
                        </button>
                      </div>

                      <label className="label-text label opacity-70">
                        Words randomly omitted based on chosen difficulty level
                      </label>
                    </div>

                    {/* Omit word */}
                    <div>
                      <button
                        onClick={omitSelectedWord}
                        className="btn-secondary btn-sm btn w-full"
                        disabled={!selectedText}
                      >
                        {selectedText?.isOmitted ? "UnOmit" : "Omit"}
                      </button>
                      <label className="label-text label opacity-70">
                        Select word or words to be omitted
                      </label>
                    </div>

                    {/* Clear omit */}
                    <div>
                      <button
                        className="btn-error btn-sm btn w-full"
                        onClick={reset}
                        disabled={!isOmit}
                      >
                        Clear
                      </button>
                      <label className="label-text label opacity-70">
                        Clear all omitted words
                      </label>
                    </div>
                  </div>

                  {/* Toggle omit */}
                  <div className="w-full rounded-lg bg-base-300 p-2">
                    <label className="label cursor-pointer p-0">
                      <span
                        className={`flex items-center gap-2 ${
                          isOmit ? "" : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        {isEyeOpen ? (
                          <>
                            <RxEyeOpen />
                            <span className="label-text">Visible</span>
                          </>
                        ) : (
                          <>
                            <RxEyeClosed />
                            <span className="label-text">Hidden</span>
                          </>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="toggle-primary toggle flex"
                        checked={isEyeOpen}
                        onChange={() => setEye((prevState) => !prevState)}
                        disabled={!isOmit}
                      />
                    </label>
                    <label className="label-text label mt-2 block p-0 opacity-70">
                      View/Hide all omitted words
                    </label>
                  </div>

                  {notebookId && (
                    <div className="rounded-lg bg-base-300 p-2">
                      <CreateFlashcard
                        className="btn-accent btn-sm btn w-full gap-2"
                        notebookId={notebookId}
                        defaultValues={{
                          question: selectedText?.text,
                        }}
                        // disabled={!selectedText}
                      >
                        <BsCardText />
                        Create flashcard
                      </CreateFlashcard>
                      <label className="label-text label mt-2 block p-0 opacity-70">
                        You can select text to display as the flashcard question
                      </label>
                    </div>
                  )}
                </div>

                <>
                  {!notebookId && (
                    <div className="w-full">
                      <AddToNotebook content={htmlText} />
                    </div>
                  )}
                </>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
