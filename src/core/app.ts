import server from './server';
import database from './db';

class App {
  public start() {
    database
      .connect()
      .then(() => {
        console.log(
          '\x1b[33m%s\x1b[0m',
          `Database :: Connected to 'mongodb://${database.host}:${database.port}/${database.dbname}'`
        );
        server.startListening();
      })
      .catch((reason) => {
        console.error('\x1b[31m%s\x1b[0m', 'Database connection failure');
        console.error('\x1b[31m%s\x1b[0m', reason);
      });
  }
}
export default new App();
