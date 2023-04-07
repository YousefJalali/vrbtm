import { Notebook } from "@/libs/types"
import { GetServerSideProps } from "next"
import { SWRConfig, unstable_serialize } from "swr"
import NotebookDetails from "@/components/notebook/notebook-details/NotebookDetails"
import { customFetch } from "@/utils"
import cookie from "cookie"
import { baseUrl } from "@/libs/data"
import Head from "next/head"

type FallbackProp = {
  [key: string]: {
    data: Notebook[]
  }
}

export default function NotebookDetailsPage({
  fallback,
  id,
  title,
}: {
  fallback: FallbackProp
  id: string
  title: string
}) {
  return (
    <>
      <Head>
        <title>{title.charAt(0).toUpperCase() + title.slice(1)} | VRBTM</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <NotebookDetails id={id} />
      </SWRConfig>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params || typeof context.params.id !== "string") {
    return { props: {} }
  }

  try {
    const { auth_token } = cookie.parse(context.req.headers.cookie || "")

    const { data: notebook, error } = await customFetch(
      `${baseUrl}/api/notebooks/${context.params.id}`,
      { method: "GET", bodyData: null, token: auth_token }
    )

    if (error) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        fallback: {
          [unstable_serialize(["/api/notebooks", `/${context.params.id}`])]: {
            data: JSON.parse(JSON.stringify(notebook)),
          },
        },
        id: context.params.id,
        title: notebook.title,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
