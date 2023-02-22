import Editor from "@/components/editor/Editor"
import Header from "@/components/layout/Header"
import { useState } from "react"
import { FiX } from "react-icons/fi"

export default function Home() {
  const [value, setValue] = useState("")

  return (
    <>
      <Header />
      <Editor htmlText={value} onChange={setValue} />
    </>
  )
}
