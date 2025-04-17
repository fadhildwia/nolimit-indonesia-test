export interface PopulationData {
  "ID Nation": string
  Nation: string
  "ID Year": number
  Year: string
  Population: number
  "Slug Nation": string
}

export interface ApiResponse {
  data: PopulationData[]
  source: {
    name: string
    measures?: string[]
    annotations: {
      source_name: string
      source_description: string
      dataset_name: string
      dataset_link: string
      table_id: string
      topic: string
      subtopic: string
    },
    substitutions?: string[]
  }[]
}