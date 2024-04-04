import { useState, useEffect } from 'react'
import { resas } from '@/lib/resas'
import { PopulationData, Prefecture } from '@/types/types'

export const usePopulationData = (
  selectedPrefCodes: number[],
  prefectures: Prefecture[]
) => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([])

  useEffect(() => {
    const fetchPopulationData = async () => {
      const newData = await Promise.all(
        selectedPrefCodes.map(async (code) => {
          const response = await resas(
            '/api/v1/population/composition/perYear',
            { prefCode: code }
          )
          const prefName =
            prefectures.find((p) => p.prefCode === code)?.prefName || ''
          return { name: prefName, data: response.result.data[0].data }
        })
      )
      setPopulationData(newData)
    }

    if (selectedPrefCodes.length > 0) {
      fetchPopulationData()
    } else {
      setPopulationData([])
    }
  }, [selectedPrefCodes, prefectures])

  return populationData
}
