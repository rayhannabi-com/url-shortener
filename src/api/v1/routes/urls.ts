import { Route } from '../../../models/route';
import urlsRoot, { UrlsController } from '../controllers/urls';

class UrlsRoutes extends Route {
  constructor() {
    super('/urls');
  }

  mountRoutes() {
    super.mountRoutes();
    this.router.get('/', urlsRoot);
    this.router.post('/', UrlsController.create());
    this.router.get('/:id', UrlsController.find());
  }
}

export default new UrlsRoutes();
