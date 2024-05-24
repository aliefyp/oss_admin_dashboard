export interface Response {
  success: boolean
  errorMessage: string
  data: Daum[]
  metadata: Metadata
}

export interface Daum {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  organizationId: number
  organizationName: string
  roleGroup: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
