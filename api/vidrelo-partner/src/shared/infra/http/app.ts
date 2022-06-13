import 'reflect-metadata';
import '@shared/infra/container/index';
import 'express-async-errors';
import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { ormCreateConnection } from '../database';
import { handleError } from './middlewares/error';
import { router } from './routes/index.router';

const app = express();

ormCreateConnection('dafault');

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', router);
app.use(handleError);

export { app };
