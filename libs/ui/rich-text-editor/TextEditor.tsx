import dynamic from "next/dynamic"
import { forwardRef, LegacyRef } from "react"
import { RefAttributes } from "react"
import ReactQuill, { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.bubble.css"
import EditorToolbar from "./EditorToolbar"

const ReactQuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")
    //@ts-ignore
    await import("quill-paste-smart")

    let Inline = RQ.Quill.import("blots/inline")
    class MarkBlot extends Inline {
      // static create() {
      //   let node = super.create()
      //   node.setAttribute("data-testid", "rich-text-editor")
      //   return node
      // }
    }
    MarkBlot.blotName = "mark"
    MarkBlot.tagName = "mark"
    RQ.Quill.register("formats/mark", MarkBlot)

    function undoChange() {
      // @ts-ignore
      this.quill.history.undo()
    }
    function redoChange() {
      // @ts-ignore
      this.quill.history.redo()
    }

    const modules = {
      toolbar: {
        container: "#toolbar",
        handlers: {
          undo: undoChange,
          redo: redoChange,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }

    const EditorWithRef = ({
      forwardedRef,
      ...props
    }: {
      forwardedRef: LegacyRef<ReactQuill>
    }) => {
      return (
        <>
          <EditorToolbar />
          <RQ ref={forwardedRef} modules={modules} {...props} />
        </>
      )
    }

    return EditorWithRef
  },
  {
    ssr: false,
    loading: () => (
      <p data-testid="editor-loading" className="p-6">
        Loading...
      </p>
    ),
  }
)

export const TextEditor = forwardRef(
  (
    props: ReactQuillProps & RefAttributes<HTMLDivElement>,
    ref: LegacyRef<ReactQuill>
  ) => {
    return <ReactQuillEditor forwardedRef={ref} theme="bubble" {...props} />
  }
)

TextEditor.displayName = "TextEditor"

export default TextEditor
