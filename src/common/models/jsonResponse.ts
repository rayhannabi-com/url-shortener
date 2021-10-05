import { Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'

type HttpStatus = { code: number; message: string }

export interface JsonResponse {
  status: HttpStatus
  data?: any
  error?: ErrorResponse
}

export interface ErrorResponse {
  code?: number
  message?: string
  details: any
}

export interface AnyJsonResponseBuilder {
  response: JsonResponse
  code(value: number): AnyJsonResponseBuilder
  data(any?: any): AnyJsonResponseBuilder
  error(any?: any): AnyJsonResponseBuilder
  error(anyError?: ErrorResponse): AnyJsonResponseBuilder
  send(res: Response): void
}

class JsonResponseBuilder implements AnyJsonResponseBuilder {
  response: JsonResponse

  constructor(code: number = 200) {
    this.response = {
      status: { code, message: getReasonPhrase(code) }
    }
  }

  code(value: number): AnyJsonResponseBuilder {
    this.response.status = { code: value, message: getReasonPhrase(value) }
    return this
  }

  data(any?: any): AnyJsonResponseBuilder {
    this.response.data = any
    return this
  }

  error(any?: any): AnyJsonResponseBuilder {
    this.response.error = {
      code: any.code,
      message: this.parseErrorMessage(any),
      details: any instanceof Array ? any : [any]
    }
    return this
  }

  send(res: Response): void {
    res.status(this.response.status.code).json(this.response)
  }

  private parseErrorMessageValue(value: any): string | null {
    if (value.hasOwnProperty('msg')) {
      return value.msg
    } else if (value.hasOwnProperty('message')) {
      return value.message
    }
    return null
  }

  private parseErrorMessage(errors: any): any {
    if (errors instanceof Array) {
      const mapErrorValue = (value: any) => {
        const msg = this.parseErrorMessageValue(value)
        if (msg) {
          return msg
        }
      }
      return errors.map(mapErrorValue).join(', ')
    } else {
      return this.parseErrorMessageValue(errors)
    }
  }
}

export const jsonResponse = (status: number = 200) =>
  new JsonResponseBuilder(status)
