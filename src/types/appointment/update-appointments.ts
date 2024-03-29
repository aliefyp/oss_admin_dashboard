export interface Response {
  success: boolean
  errorMessage: string
  data: boolean
  metadata: Metadata
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
