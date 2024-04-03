import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'

// Highchartsのオプション型を定義
interface ChartOptions {
  chart: { type: string } // グラフの種類を指定するオブジェクト
  title: { text: string } | null // ここにセミコロンを追加
  xAxis: {
    // x軸の設定
    title: { text: string } // x軸のタイトルを指定するオブジェクトにセミコロンを追加
  }
  yAxis: {
    // y軸の設定
    title: { text: string } // y軸のタイトルを指定するオブジェクト
  }
  series: { name: string; data: number[] }[] // グラフに描画するデータシリーズの配列
}

// Propsの型を定義
interface ChartProps {
  data: {
    name: string
    data: { year: string; value: number }[] // 各データポイントの年と値
  }[]
}

export const Chart = ({ data }: ChartProps) => {
  // グラフのオプションを管理するstateで初期化
  const [options, setOptions] = useState<ChartOptions>({
    chart: { type: 'line' },
    title: null,
    xAxis: { title: { text: '' } },
    yAxis: { title: { text: '' } },
    series: [],
  })

  // データが変更されたらグラフのオプションを更新する
  useEffect(() => {
    if (data.length === 0) return // データが空なら更新しない

    // グラフのオプションを設定
    setOptions({
      chart: { type: 'line' },
      title: { text: '' },
      xAxis: {
        title: { text: '年度' },
      },
      yAxis: {
        title: { text: '人口数' },
      },
      series: data.map((series) => ({
        name: series.name,
        data: series.data.map((item) => item.value),
      })),
    })
  }, [data]) // 依存配列にdataを設定し、dataが更新されたらこの効果を実行

  // Highchartsコンポーネントをレンダリングし、設定したオプションを適用
  return <HighchartsReact highcharts={Highcharts} options={options} />
}
