import Head from 'next/head' // Next.jsのHeadコンポーネントをインポート（SEO対策やページのメタデータ設定用）
import Main from '@/pages/index'
import '@/pages/styles/globals.scss' // グローバルスタイルシートをインポート

export default function App() {
  // レンダリング
  return (
    <>
      <Head>
        <title>都道府県別総人口推移</title>
        <meta name="description" content="都道府県別総人口推移グラフ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  )
}
