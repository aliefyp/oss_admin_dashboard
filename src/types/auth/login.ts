export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: Metadata
}

export interface Data {
  accessToken: string
  refreshToken: string
  userId: number
  email: string
  roleId: number
  roleName: string
  roleGroup: string
  region: string
  status: string
  serviceTypes: ServiceType[]
}

export interface ServiceType {
  id: number
  code: string
  name: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
  