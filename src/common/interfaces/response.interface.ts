export interface IJSONResponse {
  status: {
    code: number
    message: string
  }
  data?: any
  errors?: any
}
