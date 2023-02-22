import Document, { Html, Head, Main, NextScript } from "next/document"
import { ReactElement } from "react"

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="VRBTM"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <div id="modal" />
          <div id="prompt" />
          <div id="notification" /> */}
        </body>
      </Html>
    )
  }
}
