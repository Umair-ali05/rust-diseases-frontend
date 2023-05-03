import './home.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import axios from 'axios';

export const Home = () => {
  const [model, setModel] = useState();
  const [file, setFile] = useState(null);

  const addPost = async (data) => {
    try {
      console.log(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', file);
    data.append('model', model);

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
            <option>Select Model</option>
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

        <div className='container boxItems'>
          <div className='img '>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt='images'
              />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <div className='upload-file'>
                <p>Upload Picture</p>
                <label htmlFor='inputfile'>
                  <IoIosAddCircleOutline />
                </label>
              </div>
              <input
                type='file'
                id='inputfile'
                style={{ display: 'none' }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>

            <button className='button post-btn'>Start process</button>
          </form>
        </div>
      </section>
    </>
  );
};
