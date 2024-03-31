// RESAS APIにアクセスするためのベースURLを定義します
const baseURL = 'https://opendata.resas-portal.go.jp';

/**
 * RESAS APIへのリクエストを行う関数
 * 
 * @param {string} path - リクエストするエンドポイントのパス
 * @param {Record<string, string | number>} query - クエリパラメータをキーと値のペアで保持するオブジェクト
 * @param {Record<string, string>} headers - 追加のHTTPヘッダーをキーと値のペアで保持するオブジェクト
 * @returns {Promise<any>} - APIからのレスポンスをJSON形式で返す
 * @throws {Error} - リクエストが失敗した場合にエラーをスロー
 */
export const resas = async (
  path: string,
  query = {},
  headers = {}
) => {
  try {
    // クエリパラメータをURLSearchParamsオブジェクトに変換してURLを構築
    const params = new URLSearchParams(query);
    const url = `${baseURL}${path}?${params}`;

    // APIリクエストを実行
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY || '',
        'Content-Type': 'application/json;charset=UTF-8',
        ...headers,
      },
    });

    // 応答がOKでない場合は、エラーをスロー
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 応答データをJSON形式で返す
    return await response.json();
  } catch (error) {
    // エラーログをコンソールに出力し、エラーを再スロー
    console.error('Error caught while fetching:', error);
    throw error;
  }
};
