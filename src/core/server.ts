import express from 'express';
import Cors from '../middlewares/cors';
import Morgan from '../middlewares/morgan';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.connectMiddlewares();
  }

  private connectMiddlewares() {
    this.app = Cors.init(this.app);
    this.app = Morgan.init(this.app);
  }

  public startListening() {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 4000;

    this.app.listen(port, () => {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Server :: Running at 'http://${host}:${port}'`
      );
    });
  }
}

export default new Server();
