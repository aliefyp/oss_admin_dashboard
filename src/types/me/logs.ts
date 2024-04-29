export interface Response {
  success: boolean
  errorMessage: string
  data: Daum[]
  metadata: any
}

export interface Daum {
  id: number
  applicationId?: number
  appointmentId?: number
  citizenId: number
  officerId?: number
  applicationStatus?: string
  applicationLogStatus?: string
  appointmentStatus?: string
  applicationNotes?: string
  appointmentNotes: any
  action: string
  type: string
  group: string
  applicationService?: string
  applicationServiceType?: string
  citizenFullName: string
  appointmentSchedule?: string
  appointmentService?: string
  appointmentServiceType?: string
  appointmentState?: string
  appointmentOfficeLocation?: string
  createdAt: string
}
