export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: Metadata
}

export interface Data {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  organizationId: number
  roleGroup: string
  stateIds: number[]
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
