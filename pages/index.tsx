import Editor from "@/components/editor/Editor"
import Header from "@/components/layout/Header"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import { useState } from "react"
import { FiX } from "react-icons/fi"

export default function Home() {
  const [value, setValue] = useState("")

  return (
    <>
      <header className="flex items-center justify-between p-6 pb-0 lg:hidden">
        <div className="prose-sm prose w-full">
          <h1 className="m-0 text-primary">Verbatim</h1>
        </div>
        <SideDrawerButton />
      </header>
      <section className="h-full lg:max-w-2xl">
        <Editor htmlText={value} onChange={setValue} />
      </section>
    </>
  )
}
