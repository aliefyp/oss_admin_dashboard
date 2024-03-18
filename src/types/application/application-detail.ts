export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: Metadata
}

export interface Data {
  id: number
  personalDetail: PersonalDetail
  birthDetail: BirthDetail
  residenceDetail: ResidenceDetail
  familyDetail: FamilyDetail
  files: File[]
  serviceType: string
  service: string
  submissionAt: string
  reviewStep: string
  status: string
  deliveryTime: string
}

export interface PersonalDetail {
  firstName: string
  lastName: string
  identityType: string
  identityNumber: string
  email: string
  phoneNumber: string
  gender: string
  photo: Photo
  identity: Identity
}

export interface Photo {
  id: number
  fileName: string
}

export interface Identity {
  id: number
  fileName: string
}

export interface BirthDetail {
  dateOfBirth: string
  countryCode: string
  country: string
  municipalityCode: string
  municipality: string
  postAdministrativeCode: string
  postAdministrative: string
  sucosCode: string
  sucos: string
}

export interface ResidenceDetail {
  address: string
  countryCode: string
  country: string
  municipalityCode: string
  municipality: string
  postAdministrativeCode: string
  postAdministrative: string
  sucosCode: string
  sucos: string
}

export interface FamilyDetail {
  familyType: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
}

export interface File {
  id: number
  fileName: string
  status: string
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
