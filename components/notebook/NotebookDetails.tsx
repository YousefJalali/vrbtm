import Editor from "@/components/editor/Editor"
import useNotebook from "@/libs/data/notebook/queries/useNotebook"
import isEqual from "lodash.isequal"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiChevronLeft } from "react-icons/fi"
import Header from "../layout/Header"

export default function NotebookDetails({ id }: { id: string }) {
  const [value, setValue] = useState("")
  const [isReadOnly, setReadOnly] = useState(true)
  const { notebook, isLoading } = useNotebook(id)

  useEffect(() => {
    if (notebook) {
      setValue(notebook.content)
    }
  }, [notebook])

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
  if (!notebook) {
    return <div />
  }

  const editHandler = () => {
    setReadOnly((prevState) => !prevState)

    if (!isReadOnly) {
      const v = value.split("")
      const content = notebook.content.split("")

      // console.log(value === notebook.content)

      // console.log(value.slice(916, 946))
      // console.log(notebook.content.slice(916, 946))

      // for (let i = 0; i < v.length; i++) {
      //   if (v[i] !== content[i]) {
      //     console.log(i)
      //   }
      // }
    }
  }

  return (
    <>
      <Header
        leftIcon={
          <Link href="/notebooks" className="btn-ghost btn-square btn -ml-5">
            <FiChevronLeft size={24} />
          </Link>
        }
        title=""
        rightIcon={
          <button className="btn-link btn" onClick={editHandler}>
            {isReadOnly ? "Edit" : "save"}
          </button>
        }
      />
      <div>
        <div className="prose mb-6 px-6">
          <h3>{notebook.title}</h3>
          <p className="opacity-60">{notebook.description}</p>
        </div>

        <Editor
          htmlText={value}
          onChange={setValue}
          readOnly={isReadOnly}
          notebook={notebook.id}
          omitMode
        />
      </div>
    </>
  )
}
