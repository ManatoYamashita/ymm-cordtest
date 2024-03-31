// index.tsx - メインコンポーネントファイル
import Head from 'next/head'; // Next.jsのHeadコンポーネントをインポート（SEO対策やページのメタデータ設定用）
import { useState } from 'react';
import { Chart } from '@/components/chart'; // Chartコンポーネントをインポート（グラフ表示用）
import { usePrefectures } from '@/hooks/usePrefecture'; // 都道府県データを取得するカスタムフックをインポート
import { usePopulationData } from '@/hooks/usePopulationData'; // 人口データを取得するカスタムフックをインポート
import '@/pages/styles/globals.scss'; // グローバルスタイルシートをインポート
import styles from '@/pages/styles/page.module.scss';

export default function Home() {
  // 選択された都道府県コードの状態を管理
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]); // selectedPrefCodesはnumber[]型。空の配列で初期化して状態管理
  // 人口データを取得するカスタムフックを使用して、都道府県別の人口データを取得
  const { prefectures } = usePrefectures(); // `prefectures` プロパティのみを抽出
  const populationData = usePopulationData(selectedPrefCodes, prefectures).map(data => ({
    ...data,
    data: data.data.map(item => ({
      ...item,
      year: item.year.toString(),
    })),
  }));
  
  // チェックボックスの状態変更をハンドルする関数
  const handleCheckboxChange = (prefCode: number, isChecked: boolean) => {
    setSelectedPrefCodes(prev =>
      isChecked ? [...prev, prefCode] : prev.filter(code => code !== prefCode) // 状態を更新
    );
  };

  // レンダリング
  return (
    <>
      <Head>
      <title>都道府県別総人口推移</title>
        <meta name="description" content="都道府県別総人口推移グラフ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>都道府県別総人口推移</h1>
        <div className={styles.container}>
          <div className={styles.contentLeft}>
            {prefectures.map(({ prefCode, prefName }) => (
              <div
                key={prefCode}
                className={`${styles.prefectures} ${selectedPrefCodes.includes(prefCode) ? styles.prefecturesSelected : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCheckboxChange(prefCode, !selectedPrefCodes.includes(prefCode))
                }}
              >
                <input
                  type="checkbox"
                  id={`pref-${prefCode}`}
                  name="prefectures"
                  value={prefCode}
                  checked={selectedPrefCodes.includes(prefCode)}
                />
                <label htmlFor={`pref-${prefCode}`}>{prefName}</label>
              </div>
            ))}
          </div>
          <div className={styles.contentRight}>
            <div className={styles.populationChart}>
              <Chart data={populationData} />
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <small>2024 株式会社ゆめみ frontend コーディングテスト（人口データは総務省統計局のデータを利用しています。）</small>
        </footer>
      </main>
    </>
  );
}