import { Application } from 'express';
import apiRoute from '../routes/api/v1/index.route';
import appRoute from '../routes/app/index.route';

class Routes {
  public static mount(_express: Application): Application {
    const all = [apiRoute, appRoute];
    all.forEach((route) => {
      _express.use(route.root, route.router);
    });
    return _express;
  }
}

export default Routes;
