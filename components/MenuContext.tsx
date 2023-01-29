import useContextMenu from "@/libs/hooks/useContextMenu"
import useOnClickOutside from "@/libs/hooks/useOnClickOutside"
import dynamic from "next/dynamic"
import { ReactNode, Ref, useRef } from "react"

const NewFlashcard = dynamic(
  () => import("@/components/flashcard/NewFlashcard"),
  {
    ssr: false,
  }
)

const MenuContext = ({
  children,
  editorRef,
  selectedText,
}: {
  children: ReactNode
  editorRef: Ref<HTMLDivElement>
  selectedText: {
    text: string
    index: number
    length: number
    pos: { x: number; y: number }
  } | null
}) => {
  const { clicked, setClicked, points, setPoints } = useContextMenu()
  const menuContextRef = useRef(null)
  useOnClickOutside(menuContextRef, () => setClicked(false))

  // const touchEndHandler = (e: TouchEvent<HTMLDivElement>) => {
  //   if (editorRef.current.getEditor().getSelection()?.length > 0) {
  //     console.log("inside if")
  //     const bounds = editorRef.current
  //       .getEditor()
  //       .getBounds(
  //         editorRef.current.getEditor().getSelection().index,
  //         editorRef.current.getEditor().getSelection().length
  //       )
  //     console.log("here", bounds, e.nativeEvent.pageX)
  //     setClicked(true)
  //     setPoints({
  //       x: bounds.left + bounds.width,
  //       y: bounds.top + bounds.height,
  //     })
  //   }
  // }

  // useEffect(() => {
  //   console.log("triggered")
  //   if (editorRef.current.getEditor().getSelection()?.length > 0) {
  //     console.log("inside if")
  //     const bounds = editorRef.current
  //       .getEditor()
  //       .getBounds(
  //         editorRef.current.getEditor().getSelection().index,
  //         editorRef.current.getEditor().getSelection().length
  //       )
  //     console.log("here", bounds, e.nativeEvent.pageX)
  //     setClicked(true)
  //     setPoints({
  //       x: bounds.left + bounds.width,
  //       y: bounds.top + bounds.height,
  //     })
  //   }
  // }, [editorRef.current.getEditor().getSelection()])

  // editorRef.current.getEditor().on("selection-change", () => {
  //   console.log("haaa2")
  //   if (editorRef.current.getEditor().getSelection()?.length > 0) {
  //     console.log(editorRef.current.getEditor().getSelection()?.length)
  //     console.log("haaa")
  //   }
  // })

  return (
    <div className="relative">
      <div
        className="relative flex flex-1 flex-col"
        // onTouchEnd={touchEndHandler}
        //  onTouchEndCapture
        onContextMenu={(e) => {
          e.preventDefault()
          setClicked(true)
          setPoints({
            x: e.pageX,
            y: e.pageY,
          })

          // console.log(editorRef.current.getEditor().getSelection())
        }}
      >
        {children}
      </div>

      {/* @ts-ignore */}
      {selectedText && (
        <div
          ref={menuContextRef}
          className="absolute top-0 left-0"
          style={{ top: selectedText.pos.y, left: selectedText.pos.x }}
        >
          <ul className="menu rounded-box divide-y divide-base-200 bg-base-100">
            <li>
              <a>Omit</a>
            </li>
            <li>
              <label
                htmlFor="new-flashcard-modal"
                // onClick={() => setClicked(false)}
              >
                Create flashcard...
              </label>
              <NewFlashcard content={selectedText?.text || ""} />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
export default MenuContext
