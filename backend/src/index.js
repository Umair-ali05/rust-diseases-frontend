/** @format */

import express from 'express';
import * as path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import cors from 'cors';
import Router from './routes.js';
import multer from 'multer';

const upload = multer();
config();
const { PORT } = process.env;
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(upload.single('image'));
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));

app.use(morgan('dev'));
try {
  app.use('/api', Router);
  server.listen(PORT, () => {
    console.log(`Successfully connected on PORT ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}
