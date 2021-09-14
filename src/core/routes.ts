import express, { Application } from 'express';
import routes from '../api/v1/routes';

class Routes {
  public static mount(_express: Application): Application {
    const all = [routes];
    all.forEach((route) => {
      _express.use(route.root, route.router);
    });
    return _express;
  }
}

export default Routes;
