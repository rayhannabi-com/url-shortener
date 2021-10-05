import express, { Router } from 'express'

interface AnyRoute {
  root: string
  router: Router
  routesToMount(): AnyRoute[]
}

export class Route implements AnyRoute {
  root: string
  router: Router

  constructor(root: string) {
    this.root = root
    this.router = express.Router()
    this.router.use(express.json())
    this.router.use(express.urlencoded({ extended: true }))
    this.mountRoutes()
  }

  public mountRoutes() {
    this.routesToMount().forEach((route) => {
      this.router.use(route.root, route.router)
    })
  }

  public routesToMount(): Route[] {
    return []
  }
}
