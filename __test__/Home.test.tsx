// Home.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../src/pages' // コンポーネントのパスを適切に設定してください
import React from 'react'

// モックデータ
const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
]

jest.mock('../src/hooks/usePrefecture', () => ({
  usePrefectures: jest.fn(),
}))

jest.mock('../src/hooks/usePopulationData', () => ({
  usePopulationData: jest.fn(),
}))

describe('Home component', () => {
  beforeEach(() => {
    jest.mock('../src/hooks/usePrefecture', () => ({
      usePrefectures: jest.fn(() => ({
        prefectures: mockPrefectures,
        loading: false,
        error: null,
      })),
    }))

    jest.mock('../src/hooks/usePopulationData', () => ({
      usePopulationData: jest.fn(() => ({
        data: [],
        loading: false,
        error: null,
      })),
    }))
  })

  it('renders the title and checkboxes for each prefecture', () => {
    render(<Home />)
    expect(screen.getByText('都道府県別総人口推移')).toBeInTheDocument()
    expect(screen.getByLabelText('北海道')).toBeInTheDocument()
    expect(screen.getByLabelText('青森県')).toBeInTheDocument()
  })

  it('changes checkbox state when clicked', () => {
    render(<Home />)
    const checkbox = screen.getByLabelText('北海道')
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  // 他のテストケースを必要に応じて追加
})
