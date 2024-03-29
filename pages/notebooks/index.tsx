import { Notebook } from "@/libs/types"
import { GetServerSideProps } from "next"
import { SWRConfig, unstable_serialize } from "swr"
import { FiPlus } from "react-icons/fi"
import { useState } from "react"
import dynamic from "next/dynamic"
import NotebookCards from "@/components/notebook/NotebookCards"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import { customFetch } from "@/utils"
import cookie from "cookie"
import { baseUrl } from "@/libs/data"
import Head from "next/head"

const CreateNotebook = dynamic(
  () => import("@/components/notebook/CreateNotebook"),
  {
    ssr: false,
  }
)

export default function Notebooks({ fallback }: { [key: string]: Notebook[] }) {
  const [search, setSearch] = useState("")

  return (
    <>
      <Head>
        <title>Notebooks | VRBTM</title>
      </Head>
      <main>
        <header className="flex w-full flex-col items-center justify-between py-6 px-6 lg:mb-6 lg:flex-row lg:border-b">
          <div className="flex w-full items-center justify-between lg:hidden">
            <div className="prose-sm prose">
              <h1 className="m-0 text-primary">Notebooks</h1>
            </div>
            <div>
              <SideDrawerButton />
            </div>
          </div>

          <div className="flex w-full space-x-4 p-0 lg:justify-end">
            <input
              type="search"
              placeholder="Search..."
              className="input-bordered input mt-6 w-full lg:m-0 lg:max-w-sm lg:flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <CreateNotebook className="btn-primary btn-circle btn fixed bottom-5 right-6 z-50 mt-4 shadow lg:relative lg:bottom-0 lg:right-0 lg:m-0 lg:w-fit lg:rounded-lg lg:px-3">
              <span className="mr-2 hidden lg:inline-block">New Notebook</span>
              <FiPlus size={24} />
            </CreateNotebook>
          </div>
        </header>

        <section className="w-full px-6">
          <SWRConfig value={{ fallback }}>
            <NotebookCards search={search} />
          </SWRConfig>
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { auth_token } = cookie.parse(context.req.headers.cookie || "")

  const { data: notebooks } = await customFetch(
    `${baseUrl}/api/notebooks?q=list`,
    { method: "GET", bodyData: null, token: auth_token }
  )

  return {
    props: {
      fallback: {
        [unstable_serialize(["/api/notebook", "?q=list"])]: JSON.parse(
          JSON.stringify(notebooks)
        ),
      },
    },
  }
}
