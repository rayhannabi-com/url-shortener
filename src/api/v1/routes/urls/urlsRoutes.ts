import { Route } from '../../../../common/models'
import { UrlsController } from '../../controllers/urls'

class UrlsRoutes extends Route {
  constructor() {
    super('/urls')
  }

  mountRoutes() {
    super.mountRoutes()
    this.router.post('/', UrlsController.create())
    this.router.get('/:id', UrlsController.find())
    this.router.patch('/:id', UrlsController.update())
  }
}

export default new UrlsRoutes()
