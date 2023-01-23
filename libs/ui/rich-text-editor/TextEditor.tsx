import dynamic from "next/dynamic"
import { forwardRef } from "react"
import { RefAttributes } from "react"
import { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.bubble.css"
import EditorToolbar from "./EditorToolbar"

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")

    let Inline = RQ.Quill.import("blots/inline")
    class BoldBlot extends Inline {}
    BoldBlot.blotName = "mark"
    BoldBlot.tagName = "mark"
    RQ.Quill.register("formats/mark", BoldBlot)

    console.log(RQ.Quill)

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
          flashCard: () => console.log("create flashcard"),
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
      forwardedRef: any
    }) => {
      return <RQ ref={forwardedRef} modules={modules} {...props} />
    }

    return EditorWithRef
  },
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
)

export const TextEditor = forwardRef(
  (props: ReactQuillProps & RefAttributes<HTMLDivElement>, ref: any) => {
    return (
      <>
        <EditorToolbar />
        <ReactQuill
          forwardedRef={ref}
          // modules={modules}
          theme="bubble"
          {...props}
        />
      </>
    )
  }
)

TextEditor.displayName = "TextEditor"

export default TextEditor
