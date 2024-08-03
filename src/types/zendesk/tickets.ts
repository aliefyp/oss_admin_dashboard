export interface Response {
  success: boolean
  errorMessage: string
  errorCode: string
  data: Daum[]
  metadata: Metadata
}

export interface Daum {
  id: string
  subject: string
  description: string
  status: string
  tags: string[]
  createdAt: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
