import express, { Router } from 'express';
import { IRoute } from '../interfaces/route';

export class Route implements IRoute {
  root: string;
  router: Router;

  constructor(root: string) {
    this.root = root;
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));
    this.mountRoutes();
  }

  public mountRoutes() {
    this.routesToMount().forEach((route) => {
      this.router.use(route.root, route.router);
    });
  }

  public routesToMount(): Route[] {
    return [];
  }
}
