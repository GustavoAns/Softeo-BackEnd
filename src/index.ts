import { Router } from 'express';
import { registriesRoute } from './api/routes';

import App from './app';

const server = new App();

server.addRouter(registriesRoute);

server.startServer();