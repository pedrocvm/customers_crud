import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc/swagger.json';
import { json, urlencoded } from 'body-parser';
import { get } from 'config';
import customerController from './controllers/customer.controller';
import dependentController from './controllers/dependent.controller';
dotenv.config();

export const app = express();

const port = get('app.port');
let server = null;

export default class API {
  start = () => {
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
    app.use('/', customerController);
    app.use('/', dependentController);

    server = app.listen(port, () => {
      console.log(`API Started on http://localhost:${port}/`);
      console.log(`Access our Documentation on http://localhost:${port}/doc`);
    });
  };

  stop = () => {
    server.close((error: any) => {
      if (error) {
        throw error;
      }
    });
  };
}
