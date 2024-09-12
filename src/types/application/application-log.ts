export interface Response {
  success: boolean
  errorMessage: string
  errorCode: string
  data: Daum[]
  metadata: Metadata
}

export interface Daum {
  id: number
  createdAt: string
  status: string
  notes: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
