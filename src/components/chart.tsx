import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'

interface ChartOptions {
  chart: { type: string }
  title: { text: string } | null 
  xAxis: {title: { text: string }}
  yAxis: {title: { text: string }}
  series: { name: string; data: number[] }[]
}

interface ChartProps {
  data: {
    name: string
    data: { year: string; value: number }[]
  }[]
}

export const Chart = ({ data }: ChartProps) => {
  const [options, setOptions] = useState<ChartOptions>({
    chart: { type: 'line' },
    title: null,
    xAxis: { title: { text: '' } },
    yAxis: { title: { text: '' } },
    series: [],
  })

  useEffect(() => {
    if (data.length === 0) return

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
  }, [data])

  return <HighchartsReact highcharts={Highcharts} options={options} />
}
