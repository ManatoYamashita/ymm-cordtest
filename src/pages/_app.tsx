import Head from 'next/head'
import Main from '@/pages/index'
import '@/pages/styles/globals.scss'

export default function App() {
  return (
    <>
      <Head>
        <title>都道府県別総人口推移</title>
        <meta name="description" content="都道府県別総人口推移グラフ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Main />
    </>
  )
}
