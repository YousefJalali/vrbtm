import { Notebook } from "@/libs/types"
import { GetServerSideProps } from "next"
import { prisma } from "@/libs/db/prisma"
import { SWRConfig, unstable_serialize } from "swr"
import FlashcardList from "@/components/flashcard/FlashcardList"
import { useState } from "react"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import { baseUrl } from "@/libs/data"
import { customFetch } from "@/utils"
import cookie from "cookie"

export default function Flashcards({
  fallback,
}: {
  [key: string]: Notebook[]
}) {
  const [search, setSearch] = useState("")

  return (
    <main>
      <header className="flex w-full flex-col items-center justify-between py-6 px-6 lg:mb-6 lg:flex-row lg:border-b">
        <div className="flex w-full items-center justify-between lg:hidden">
          <div className="prose-sm prose">
            <h1 className="m-0 text-primary">Flashcards</h1>
          </div>
          <div>
            <SideDrawerButton />
          </div>
        </div>

        <div className="flex w-full space-x-4 p-0 lg:justify-end">
          <input
            type="search"
            placeholder="Search..."
            className="input-bordered input mt-6 w-full lg:m-0 lg:max-w-lg lg:flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <section className="px-6">
        <SWRConfig value={{ fallback }}>
          <FlashcardList search={search} />
        </SWRConfig>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { auth_token } = cookie.parse(context.req.headers.cookie || "")

  const { data: flashcardsWithNotebooks } = await customFetch(
    `${baseUrl}/api/notebooks?q=with-flashcards`,
    { method: "GET", bodyData: null, token: auth_token }
  )

  console.log(flashcardsWithNotebooks)

  return {
    props: {
      fallback: {
        [unstable_serialize(["/api/notebooks", "?q=with-flashcards"])]:
          JSON.parse(JSON.stringify(flashcardsWithNotebooks)),
      },
    },
  }
}
