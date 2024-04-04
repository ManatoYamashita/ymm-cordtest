import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Home from '../src/pages/index'
import * as usePrefectureHook from '../src/hooks/usePrefecture'
import * as usePopulationDataHook from '../src/hooks/usePopulationData'

// 都道府県データと人口データのモック
const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
]
const mockPopulationData = [
  {
    prefCode: 1,
    data: [
      { year: 2000, value: 1000 },
      { year: 2010, value: 1100 },
    ],
  },
]

// カスタムフックのモック実装
jest.mock('@/hooks/usePrefecture', () => ({
  usePrefectures: jest.fn().mockImplementation(() => ({
    prefectures: mockPrefectures,
    loading: false,
    error: null,
  })),
}))
jest.mock('@/hooks/usePopulationData', () => ({
  usePopulationData: jest.fn(),
}))

describe('Home component', () => {
  beforeEach(() => {
    usePrefectureHook.usePrefectures.mockImplementation(() => ({
      prefectures: mockPrefectures,
    }))
    usePopulationDataHook.usePopulationData.mockImplementation(
      () => mockPopulationData
    )
  })

  it('renders correctly', () => {
    const { getByText } = render(<Home />)
    expect(getByText('都道府県別総人口推移')).toBeInTheDocument()
  })

  it('updates selectedPrefCodes on checkbox change', async () => {
    const { getByLabelText } = render(<Home />)
    const checkbox = getByLabelText('北海道')
    fireEvent.click(checkbox)
  })

  it('passes correct data to Chart component', () => {
    const { container } = render(<Home />)
    const chartElement = container.querySelector('svg.highcharts-root')
    expect(chartElement).toBeInTheDocument()
  })
})
