import Document, { Html, Head, Main, NextScript } from "next/document"
import { ReactElement } from "react"

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="VRBTM"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
