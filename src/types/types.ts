export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface PopulationData {
  name: string
  data: { year: number; value: number }[]
}
