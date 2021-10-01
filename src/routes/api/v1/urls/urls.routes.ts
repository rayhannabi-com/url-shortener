import { Route } from '../../../../models/common/route.model';
import { UrlsController } from '../../../../controllers/api/v1/urls/index.controller';

class UrlsRoutes extends Route {
  constructor() {
    super('/urls');
  }

  mountRoutes() {
    super.mountRoutes();
    this.router.post('/', UrlsController.create());
    this.router.get('/:id', UrlsController.find());
  }
}

export default new UrlsRoutes();
