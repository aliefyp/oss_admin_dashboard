export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: Metadata
}

export interface Data {
  email: string
  accessToken: string
  refreshToken: string
  userId: number
  roleId: number
  status: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
