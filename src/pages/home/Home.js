import './home.css';
import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

export const Home = () => {
  const [model, setModel] = useState();
  const [tfModel, setTfModel] = useState();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);

  // const loadModel = async (file) => {
  //   const absolutePath = path.resolve(file);
  //   console.log(absolutePath);
  //   const model = await tf.loadLayersModel(file);
  //   return model;
  // };

  useEffect(() => {
    const loadModel = async () => {
      console.log('here');
      const model = await tf.loadLayersModel('/public/tfjs/model.json');

      // const inputTensor = tf.tensor2d([[1, 2, 3, 4]], [1, 4]);
      // const prediction = model.predict(inputTensor);
      setTfModel(model);
    };

    loadModel();
  }, []);

  const readImage = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(image);
    });
  };

  const handleClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageData = await readImage(image);
    setImageData(imageData);

    const tensor = tf.browser.fromPixels(imageData);

    const prediction = model.predict(tensor);

    // Do something with the prediction results
    console.log(prediction.dataSync());

    // Cleanup the tensors if necessary
    tf.dispose(tensor);
    tf.dispose(prediction);

    const data = new FormData();
    data.append('image', image);
    data.append('model', model);
  };
  return (
    <>
      <section className='mainDiv'>
        <h1> Wheat Rust Disease Detuction</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputfile flexCenter'>
            <div className='inputfile flexCenter'>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'grey',
                  cursor: 'pointer',
                }}
                onClick={handleClick}
              >
                {image ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    src={URL.createObjectURL(image)}
                    alt='uploaded image'
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <p style={{ textAlign: 'center', lineHeight: '100px' }}>
                    Click to upload image
                  </p>
                )}
              </div>
              <input
                type='file'
                accept='image/*'
                id='image-upload'
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                style={{ display: 'none' }}
              />
            </div>
            <div className='select'>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option>Please Select a Model</option>

                <option
                  key={1234}
                  value={'disease'}
                >
                  Disease
                </option>
              </select>
            </div>
            <button className='button post-btn'>Start process</button>
          </div>
        </form>
      </section>
    </>
  );
};
