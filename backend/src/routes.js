/** @format */

import express from 'express';
import { config } from 'dotenv';

import modelController from './modules/model/controller.js';

config();
const router = express.Router();

router.post('/process-image', modelController.uploadImage);

router.use('*', (req, res) => {
  res.status(404).json({
    code: "404 : page not found'",
  });
});
export default router;
