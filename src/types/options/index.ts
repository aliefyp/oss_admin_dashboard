export interface Response {
  success: boolean
  errorMessage: string
  data: string[]
  metadata: Metadata
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
