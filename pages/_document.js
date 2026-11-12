import { Html, Head, Main, NextScript } from 'next/document'

// Adds lang="en" to every page. No other markup is changed.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
