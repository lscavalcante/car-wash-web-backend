export interface ServiceDetailModel {
  id: number
  services_price: number
  services: Service[]
  client: Client
  employee: string
  title: string
  date_start: string
  date_end: string
  finish: boolean
  protocol: string
  created_by: number
  updated_by: any
  vehicle: number
}

export interface Service {
  id: number
  title: string
  price: string
  service_category?: number
}

export interface Client {
  id: number
  email: string
  first_name: string
  last_name: string
}
