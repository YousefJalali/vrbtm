import { Notebook } from "@/libs/types"
import { GetStaticProps } from "next"
import { prisma } from "@/libs/db/prisma"
import { SWRConfig, unstable_serialize } from "swr"
import NotebookList from "@/components/notebook/NotebookList"
import Header from "@/components/layout/Header"

export default function Notebooks({ fallback }: { [key: string]: Notebook[] }) {
  return (
    <>
      <Header title="Notebooks" />

      <main className="px-6">
        <SWRConfig value={{ fallback }}>
          <NotebookList />
        </SWRConfig>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notebooks = await prisma.notebook.findMany({})

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
