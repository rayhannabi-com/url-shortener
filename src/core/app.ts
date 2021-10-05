import database from './db'
import server from './server'

class App {
  public start() {
    database.connect()
    server.startListening()
  }
}
export default new App()
