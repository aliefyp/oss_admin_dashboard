export interface Response {
  success: boolean
  errorMessage: string
  data: Daum[]
  metadata: Metadata
}

export interface Daum {
  code: string
  name: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
