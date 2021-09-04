import mongoose from 'mongoose';

class Database {
  public host = process.env.DB_HOST || 'localhost';
  public port = process.env.DB_PORT || '27017';
  public dbname = process.env.DB_NAME || 'url-shortener';
  public username = process.env.DB_USERNAME || '';
  private password = process.env.DB_PASSWORD || '';

  private build_connection(): string {
    const host = this.host + ':' + this.port;
    var uri = 'mongodb://';
    if (this.username.length > 0 && this.password.length > 0) {
      uri += this.username + ':' + this.password + '@';
    }
    uri += host + '/' + this.dbname;
    return uri;
  }

  public connect() {
    const connectionString = this.build_connection();
    return mongoose.connect(connectionString);
  }
}

export default new Database();
