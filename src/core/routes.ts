import { Application } from 'express';
import { Route } from '../models/common/route.model';
import apiRoute from '../routes/api/v1/index.route';
import appRoute from '../routes/app/index.route';

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
