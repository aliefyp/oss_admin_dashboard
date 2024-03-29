export interface Response {
  success: boolean
  errorMessage: string
  data: Daum[]
  metadata: Metadata
}

export interface Daum {
  id: number
  fullName: string
  identityNumber: string
  service: string
  office: string
  scheduledAt: string
  status: string
  isRegistered: boolean
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
