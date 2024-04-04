const baseURL = 'https://opendata.resas-portal.go.jp'

/**
 * @param {string} path
 * @param {Record<string, string | number>} query
 * @param {Record<string, string>} headers
 * @returns {Promise<any>}
 * @throws {Error}
 */

export const resas = async (
  path: string,
  query: Record<string, string | number> = {},
  headers: Record<string, string> = {}
): Promise<any> => {
  try {
    const params = new URLSearchParams(
      Object.entries(query).map(([key, value]) => [key, String(value)])
    )
    const url = `${baseURL}${path}?${params}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY || '',
        'Content-Type': 'application/json;charset=UTF-8',
        ...headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}
