import { AppController } from '../controllers/index.controller';
import { Route } from '../../common/models/route.model';

class AppRoute extends Route {
  constructor() {
    super('/');
  }

  mountRoutes() {
    super.mountRoutes();
    this.router.get('/', AppController.root);
    this.router.get('/:id', AppController.redirect());
  }
}

export default new AppRoute();
