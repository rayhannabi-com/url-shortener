import cors from 'cors'
import { Application } from 'express'

class Cors {
  public static init(_express: Application): Application {
    return _express.use(
      cors({
        origin: 'localhost',
        optionsSuccessStatus: 200
      })
    )
  }
}

export default Cors
