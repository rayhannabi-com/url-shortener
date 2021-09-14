import server from './server';
import database from './db';

class App {
  public start() {
    database.connect();
    server.startListening();
  }
}
export default new App();
