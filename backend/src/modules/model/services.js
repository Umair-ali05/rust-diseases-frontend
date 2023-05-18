import { config } from 'dotenv';
import pkg from '@tensorflow/tfjs-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const { node: tf } = pkg;
const decodeImage = tf.node.decodeImage;

export default {
  processImage: async (file) => {
    if (!file) {
      return {
        success: false,
        message: 'Please select an image file.',
      };
    }
    try {
      console.log(decodeImage);
      const imageBuffer = fs.readFileSync(file.buffer);
      const imageTensor = decodeImage(imageBuffer);

      // Load the Keras model
      // const modelPath = path.join(
      //   __dirname,
      //   '../../../../backend/public/tfjs/model.json'
      // );
      // const model = await tf.loadLayersModel(`/backend/public/tfjs/model.json`);
      console.log(modelPath);

      // Make predictions using the loaded model
      const predictions = model.predict(imageTensor);

      // Process the predictions
      // ...

      // Return the predictions or any other response
      return {
        success: true,
        predictions: predictions,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
