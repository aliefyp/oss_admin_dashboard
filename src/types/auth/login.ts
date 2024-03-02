export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: any
}

export interface Data {
  email: string
  accessToken: string
  refreshToken: string
  userId: number
  roleId: number
}
