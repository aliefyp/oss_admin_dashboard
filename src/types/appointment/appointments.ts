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
  serviceId: number
  service: string
  stateId: number
  state: string
  officeLocationId: number
  officeLocation: string
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
