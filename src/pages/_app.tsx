import Head from 'next/head'
import { useEffect } from 'react'
import Main from '@/pages/index'
import '@/pages/styles/globals.scss'
import Highcharts from 'highcharts'

export default function App() {
  
  useEffect(() => {
    Highcharts.setOptions({
      accessibility: {
        enabled: false
      }
    });
  }, []);

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
