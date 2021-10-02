import { Application } from 'express';
import { Route } from '../common/models/route.model';
import apiRoute from '../api/v1/routes/index.route';
import appRoute from '../app/routes/index.route';

class Routes {
  public static mount(_express: Application): Application {
    this.allRoutes().forEach((route) => {
      _express.use(route.root, route.router);
    });
    return _express;
  }

  private static allRoutes(): Route[] {
    return [apiRoute, appRoute];
  }
}

export default Routes;
