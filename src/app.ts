import express, { Router } from 'express';
import mongoose from 'mongoose';
import vars from './vars'


class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public startServer(port = 3001) {
    mongoose.connect(vars.mongodb_connect_url)
    const actualPort = vars.api.port || process.env.PORT || port;
    return this.app.listen(
      actualPort,
      () => console.log('Estamos online na porta: ', actualPort),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }
}

export default App;