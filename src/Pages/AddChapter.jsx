import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../Component/Navbar';
import Sidebar from '../Component/Sidebar';
import axios from 'axios';
import Editor from '../text_editor';

const AddChapter = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [synopsis, setStory] = useState('');

  const saveChapter = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        title,
        synopsis,
      });
      navigate('/add-story');
    } catch (error) {
      console.error('There was an error saving the chapter', error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="w-full h-screen bg-slate-200">
        <div className="flex justify-start w-56 float-start">
          <Sidebar />
        </div>
        <div className="w-full bg-slate-200">
          <div>
            <div className="p-4">
              <Link to="/">
                <button className='text-purple-700 underline transition-transform hover:scale-110 duration-300'>
                  <span><img src="" alt="" /></span>List Story
                </button>
              </Link>
              <span className="mx-4">{'<'}</span>
              <Link to="/add-story">
                <button className='text-purple-700 underline ml-4 transition-transform hover:scale-110 duration-300'>
                  <span><img src="" alt="" /></span>Add Story
                </button>
              </Link>
            </div>
            <div className="p-2">
              <h1 className="font-bold text-[2rem]">Add Chapter</h1>
            </div>
            <form onSubmit={saveChapter} className="bg-white w-[60%] h-auto ml-56 border-2 rounded-md border-gray-300">
              <div className="p-4">
                <label htmlFor="title" className="mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="border-2 p-2 rounded-md w-full mb-4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="mainStory" className="mb-2">Story</label>
                <Editor value={synopsis} onChange={setStory} />
              </div>
              <div className="flex justify-end items-center ml-auto pt-2 pr-4 mb-7"> 
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="p-2 w-28 rounded-md transition-transform hover:scale-105 duration-300 border-2 shadow-md shadow-blue-300 border-blue-500 text-blue-500"
                    onClick={() => navigate(-1)} 
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="p-2 w-28 rounded-md transition-transform hover:scale-105 duration-300 bg-blue-500 shadow-md shadow-blue-400 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChapter;
