export interface Response {
  success: boolean
  errorMessage: string
  data: Daum[]
  metadata: Metadata
}

export interface Daum {
  id: number
  identityType: string
  identityNumber: string
  fullName: string
  serviceType: string
  service: string
  municipalityCode: string
  municipality: string
  submissionAt: string
  reviewStep: string
  status: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
