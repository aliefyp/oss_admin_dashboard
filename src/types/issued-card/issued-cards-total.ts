export interface Response {
  success: boolean
  errorMessage: string
  data: number
  metadata: Metadata
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
