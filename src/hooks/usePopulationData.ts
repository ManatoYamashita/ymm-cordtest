import { useState, useEffect } from 'react'
import { resas } from '@/lib/resas'
import { PopulationData, Prefecture } from '@/types/types'

// usePopulationDataは、選択された都道府県コードの配列と都道府県情報の配列を引数に取るカスタムフック。
export const usePopulationData = (
  selectedPrefCodes: number[],
  prefectures: Prefecture[]
) => {
  // 人口データを保持するための状態を定義。
  const [populationData, setPopulationData] = useState<PopulationData[]>([])

  useEffect(() => {
    // fetchPopulationDataは、選択された各都道府県コードに対してAPIから人口データを取得する非同期関数。
    const fetchPopulationData = async () => {
      // Promise.allを使用して、すべての都道府県コードに対するAPIリクエストを並行して実行。
      const newData = await Promise.all(
        selectedPrefCodes.map(async (code) => {
          const response = await resas(
            '/api/v1/population/composition/perYear',
            { prefCode: code }
          )
          // 取得したデータから都道府県名を検索し、結果をnewDataに格納。
          const prefName =
            prefectures.find((p) => p.prefCode === code)?.prefName || ''
          return { name: prefName, data: response.result.data[0].data }
        })
      )
      // 取得した新しいデータを状態にセット。
      setPopulationData(newData)
    }

    // 選択された都道府県コードがある場合は、人口データ取得関数を実行。そうでなければ状態を空にする。
    if (selectedPrefCodes.length > 0) {
      fetchPopulationData()
    } else {
      setPopulationData([])
    }
  }, [selectedPrefCodes, prefectures]) // 選択された都道府県コードと都道府県リストが変更された時にのみ実行。

  // 最終的に取得した人口データを返す。
  return populationData
}
