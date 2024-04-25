export interface Response {
  success: boolean
  errorMessage: string
  data: Data
  metadata: Metadata
}

export interface Data {
  dailyRegisteredCitizens: DailyRegisteredCitizen[]
  weeklyRegisteredCitizens: WeeklyRegisteredCitizen[]
  monthlyRegisteredCitizens: MonthlyRegisteredCitizen[]
  registeredCitizenByGenders: RegisteredCitizenByGender[]
  registeredCitizenByAges: RegisteredCitizenByAge[]
  totalApplicationByStatus: TotalApplicationByStatu[]
  totalApplicationByServiceTypes: TotalApplicationByServiceType[]
}

export interface DailyRegisteredCitizen {
  date: string
  total: number
}

export interface WeeklyRegisteredCitizen {
  date: string
  total: number
}

export interface MonthlyRegisteredCitizen {
  date: string
  total: number
}

export interface RegisteredCitizenByGender {
  gender: string
  total: number
}

export interface RegisteredCitizenByAge {
  age: number
  total: number
}

export interface TotalApplicationByStatu {
  status: string
  total: number
}

export interface TotalApplicationByServiceType {
  serviceType: string
  total: number
}

export interface Metadata {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
}
