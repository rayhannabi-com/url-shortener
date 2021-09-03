import server from './server';

class App {
  public start() {
    server.startListening();
  }
}
export default new App();
