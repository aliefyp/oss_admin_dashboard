export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: any
}

export interface Data {
  id: number
  applicationId: any
  firstName: string
  lastName: string
  identityType: string
  identityNumber: string
  email: string
  phoneNumber: string
  gender: string
  serviceType: string
  service: string
  stateId: number
  state: string
  officeLocationId: number
  officeLocation: string
  scheduledAt: string
  status: string
  photoFileId: number
}
