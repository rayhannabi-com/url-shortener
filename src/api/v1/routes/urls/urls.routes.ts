import { Route } from '../../../../common/models/route.model';
import { UrlsController } from '../../controllers/urls/index.controller';

class UrlsRoutes extends Route {
  constructor() {
    super('/urls');
  }

  mountRoutes() {
    super.mountRoutes();
    this.router.post('/', UrlsController.create());
    this.router.get('/:id', UrlsController.find());
    this.router.patch('/:id', UrlsController.update());
  }
}

export default new UrlsRoutes();
