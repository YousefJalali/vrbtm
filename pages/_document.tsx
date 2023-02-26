import Document, { Html, Head, Main, NextScript } from "next/document"
import { ReactElement } from "react"

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en" data-theme="light">
        <Head>
          <meta name="description" content="VRBTM"></meta>
        </Head>
        <body className="w-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
