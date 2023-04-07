import Editor from "@/components/editor/Editor"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const [value, setValue] = useState("")

  return (
    <>
      <Head>
        <title>VRBTM</title>
      </Head>
      <main className="overflow-hidden">
        <header className="flex w-full items-center justify-between p-6 pb-0 lg:hidden">
          <div className="prose-sm prose w-full">
            <h1 className="m-0 text-primary">Verbatim</h1>
          </div>
          <SideDrawerButton />
        </header>

        <Editor htmlText={value} onChange={setValue} />
      </main>
    </>
  )
}
