export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: any
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
  countryId: number
  countryCode: string
  country: string
  stateId: number
  stateCode: string
  state: string
  districtId: number
  districtCode: string
  district: string
  subDistrictId: number
  subDistrictCode: string
  subDistrict: string
}

export interface ResidenceDetail {
  address: string
  countryId: number
  countryCode: string
  country: string
  stateId: number
  stateCode: string
  state: string
  districtId: number
  districtCode: string
  district: string
  subDistrictId: number
  subDistrictCode: string
  subDistrict: string
}

export interface FamilyDetail {
  familyType: string
  firstName: any
  lastName: any
  gender: any
  dateOfBirth: any
}

export interface File {
  id: number
  fileName: string
  frontOfficeStatus: string
  backOfficeStatus: string
}
  