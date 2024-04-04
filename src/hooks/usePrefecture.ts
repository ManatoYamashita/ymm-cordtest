import { useState, useEffect } from 'react'
import { resas } from '@/lib/resas'
import { Prefecture } from '@/types/types'

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await resas('/api/v1/prefectures')
        if (response && response.result) {
          setPrefectures(response.result)
        } else {
          throw new Error('No result found')
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { prefectures, loading, error }
}
