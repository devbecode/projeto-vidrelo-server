import 'reflect-metadata';
import '../container/index';
import 'express-async-errors';
import 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { ormCreateConnection } from '../database';
import { handleError } from './middlewares/error';
import { queueService } from './middlewares/queue';
import { router } from './routes/index.router';

const app = express();

ormCreateConnection('default');
queueService();

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', router);
app.use(handleError);

export { app };
