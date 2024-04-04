import { useState } from 'react'
import { Chart } from '@/components/chart'
import { usePrefectures } from '@/hooks/usePrefecture'
import { usePopulationData } from '@/hooks/usePopulationData'
import styles from '@/pages/styles/page.module.scss'

export default function Home() {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])
  const { prefectures } = usePrefectures()
  const populationData = usePopulationData(selectedPrefCodes, prefectures).map(
    (data) => ({
      ...data,
      data: data.data.map((item) => ({
        ...item,
        year: item.year.toString(),
      })),
    })
  )

  function onChange(prefCode: number, isChecked: boolean) {
    setSelectedPrefCodes((prev) =>
      isChecked ? [...prev, prefCode] : prev.filter((code) => code !== prefCode)
    )
  }

  return (
    <>
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
                  onChange(prefCode, !selectedPrefCodes.includes(prefCode))
                }}
              >
                <input
                  type="checkbox"
                  id={`pref-${prefCode}`}
                  name="prefectures"
                  value={prefCode}
                  checked={selectedPrefCodes.includes(prefCode)}
                  onChange={(e) => onChange(prefCode, e.target.checked)}
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
          <small>
            2024 株式会社ゆめみ frontend
            コーディングテスト（人口データは総務省統計局のデータを利用しています。）
          </small>
        </footer>
      </main>
    </>
  )
}
