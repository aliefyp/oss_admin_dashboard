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
  stateId: number
  state: string
  deliveryTime: string
  issuedAt: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
