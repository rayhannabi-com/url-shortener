import { Route } from '../../../common/models'
import { ApiController } from '../controllers/apiController'
import urls from './urls/urlsRoutes'

class ApiRoute extends Route {
  constructor() {
    super('/api/v1')
  }

  mountRoutes() {
    super.mountRoutes()
    this.router.get('/', ApiController.getRoot)
  }

  routesToMount(): Route[] {
    return [urls]
  }
}

export default new ApiRoute()
