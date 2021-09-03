import express from 'express';
import Cors from '../middlewares/cors';
import Morgan from '../middlewares/morgan';

class Server {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.connectMiddlewares();
  }

  private connectMiddlewares() {
    this.express = Cors.init(this.express);
    this.express = Morgan.init(this.express);
  }

  public startListening() {
    const host = 'localhost';
    const port = 4000;

    this.express.listen(port, () => {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Server :: Running at 'http://${host}:${port}'`
      );
    });
  }
}

export default new Server();
