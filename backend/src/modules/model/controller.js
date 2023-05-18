/** @format */

import { config } from 'dotenv';
import ModelService from './services.js';

config();

export default {
  uploadImage: async (req, res) => {
    try {
      const { file } = req;

      const response = await ModelService.processImage(file);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
