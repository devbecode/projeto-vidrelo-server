import 'reflect-metadata';
import '../container/index';
import 'express-async-errors';
import 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { handleError } from './middlewares/error';
import { appQueue } from './middlewares/queue';
import { router } from './routes/index.router';

const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', router);
app.use(handleError);

appQueue.on('error', err => {
  console.error(err.message);
});

appQueue.on('processing_error', err => {
  console.error(err.message);
});

appQueue.start();

export { app };
