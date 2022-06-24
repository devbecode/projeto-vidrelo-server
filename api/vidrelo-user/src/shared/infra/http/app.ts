import 'reflect-metadata';
import '@shared/infra/container/index';
import 'express-async-errors';
import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { ormCreateConnection } from '../database';
import { handleError } from './middlewares/error';
import { router } from './routes/index.router';
import swaggerDocs from './swagger.json';

const app = express();

ormCreateConnection('default');

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', router);
app.use(handleError);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export { app };
