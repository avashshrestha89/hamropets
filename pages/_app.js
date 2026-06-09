import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="qqY-rBWJtTeiK1itm_Eju2Zn5HKYYRSAA9iiTf-E7Do" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
