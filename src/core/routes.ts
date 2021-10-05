import { Application } from 'express'
import apiRoute from '../api/v1/routes/apiRoute'
import appRoute from '../app/routes/appRoute'
import { Route } from '../common/models'

class Routes {
  public static mount(app: Application): Application {
    this.allRoutes().forEach((route) => {
      app.use(route.root, route.router)
    })
    return app
  }

  private static allRoutes(): Route[] {
    return [apiRoute, appRoute]
  }
}

export default Routes
