import { Application } from 'express';
import morgan from 'morgan';

class Morgan {
  public static init(_express: Application): Application {
    return _express.use(morgan('dev'));
  }
}

export default Morgan;
