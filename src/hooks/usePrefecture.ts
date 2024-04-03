import { useState, useEffect } from 'react'
import { resas } from '@/lib/resas'
import { Prefecture } from '@/types/types'

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // useEffectフックを使って、コンポーネントのマウント時にデータ取得処理を実行している。
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // データ取得開始時にloading状態をtrueに設定
      try {
        const response = await resas('/api/v1/prefectures')
        // APIから正常にデータが返された場合、そのデータを状態に設定する。
        if (response && response.result) {
          setPrefectures(response.result)
        } else {
          // APIからデータが正常に返されなかった場合、エラーを投げる。
          throw new Error('No result found')
        }
      } catch (err) {
        // データ取得時にエラーが発生した場合、エラー状態を設定する。
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        // 処理が完了（成功または失敗）したら、loading状態をfalseに設定する。
        setLoading(false)
      }
    }

    // fetchData関数を実行してデータ取得処理を開始する。
    fetchData()
  }, [])

  // カスタムフックから都道府県データ、ローディング状態、エラー状態を返している。
  return { prefectures, loading, error }
}
