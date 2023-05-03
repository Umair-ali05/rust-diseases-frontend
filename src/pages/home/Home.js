import './home.css';
import { useState } from 'react';
import axios from 'axios';

export const Home = () => {
  const [model, setModel] = useState();
  const [image, setImage] = useState(null);

  const addPost = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:30000/api/category',
        data,
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );

      // window.location.replace('/post/' + res.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
  };

  const handleClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', image);
    data.append('model', model);

    console.log(data);
    addPost(data);
  };

  return (
    <>
      <section className='mainDiv'>
        <div className='model-selection'>
          <select
            value={''}
            onChange={(e) => setModel(e.target.value)}
          >
            <option>Please Select a Model fron Dropdown</option>
            <option
              key={1234}
              value='wheat'
            >
              Wheat Disease
            </option>
            <option
              key={123}
              value='Disease'
            >
              Disease
            </option>
          </select>
        </div>
        <form onSubmit={handleSubmit}>
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
              <img
                src={image}
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
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <button className='button post-btn'>Start process</button>
        </form>
      </section>
    </>
  );
};
