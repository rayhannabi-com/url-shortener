import { Router } from 'express'

export interface IRoute {
  root: string
  router: Router
  routesToMount(): IRoute[]
}
