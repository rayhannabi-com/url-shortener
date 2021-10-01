import { Route } from '../../../models/common/route.model';
import { ApiController } from '../../../controllers/api/v1/index.controller';
import urls from './urls/urls.routes';

class ApiRoute extends Route {
  constructor() {
    super('/api/v1');
  }

  mountRoutes() {
    super.mountRoutes();
    this.router.get('/', ApiController.getRoot);
  }

  routesToMount() {
    return [urls];
  }
}

export default new ApiRoute();
