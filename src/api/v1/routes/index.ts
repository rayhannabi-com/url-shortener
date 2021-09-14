import { Route } from '../../../models/route';
import { ApiController } from '../controllers';
import urls from './urls';

class ApiRoutes extends Route {
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

export default new ApiRoutes();
