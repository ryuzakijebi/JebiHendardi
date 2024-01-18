import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../Component/Navbar';
import Sidebar from '../Component/Sidebar';
import axios from 'axios';
import detailImg from '../Assets/detail.png';
import deleteImg from '../Assets/delete.png';
import editImg from '../Assets/edit.png';

const AddStory = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState(''); 
  const [tag, setTag] = useState('');
  const [cover, setCover] = useState('');
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [editStory, setEditStory] = useState({
    title: '',
    updatedAt: '',
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedUserDetail, setSelectedUserDetail] = useState(null);

    const openDetailModal = (user) => {
        setSelectedUserDetail(user);
        setIsDetailModalOpen(true);
      };

  const saveEditStory = () => {
    const updatedUsers = users.map(user => {
        if (user.id === editStory.id) {
            return editStory; 
        }
        return user; 
    });
  
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers(); 
      setIsDeleteModalOpen(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const updateEditStory = (e) => {
    if (e.target.name === 'lastUpdate') {
      setEditStory({ ...editStory, updatedAt: new Date().toISOString() });
    } else {
      setEditStory({ ...editStory, [e.target.name]: e.target.value });
    }
  };
  
  useEffect(() => {
    getUsers(); 
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const openEditModal = (story) => {
    setEditStory(story);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  const categories = ['Financial', 'Technology', 'Health']; 

  const saveStory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        title,
        writer,
        synopsis,
        category,
        tag,
        cover,
        status,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const Modal = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md">
        <p>Are you sure you want to cancel adding the story without saving the data?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 rounded bg-gray-200"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <NavigationBar />
      <div className="w-full h-auto bg-slate-200">
        <div className="flex justify-start w-56 float-start">
          <Sidebar />
        </div>
        <div className="w-full">
          <div >
            <div className="p-2">
              <div className="p-4">
                <Link to="/">
                  <button className="text-purple-700 underline transition-transform hover:scale-110 duration-300">
                    <span>
                      <img src="" alt="" />
                    </span>{' '}
                    List Story
                  </button>
                </Link>
              </div>
              <div className="p-2">
                <h1 className="font-bold text-gray-700 text-[2rem] mb-2">
                  Add Story
                </h1>
              </div>
              <form onSubmit={saveStory} className="ml-52 mb-28">
                <div className="bg-white w-[80%] h-auto border-2 border-gray-300">
                  <div className="p-4">
                    <div className="grid grid-cols-2 mb-2">
                      <div className="w-full">
                        <label htmlFor="title" className="mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="w-[95%] border-2 p-2 rounded-sm"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Title"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="writer" className="mb-2">
                          Writer Name
                        </label>
                        <input
                          type="text"
                          id="writer"
                          className="w-[95%] border-2 p-2 rounded-sm"
                          value={writer}
                          onChange={(e) => setWriter(e.target.value)}
                          placeholder="Writer Name"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="synopsis" className="mb-2">
                        Synopsis
                      </label>
                      <textarea
                        id="synopsis"
                        placeholder="Synopsis"
                        className="border-2 w-[98%] mb-2 h-36 p-2"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                      <div className="w-full">
                        <label htmlFor="category" className="mb-2">
                          Category
                        </label>
                        <select
                          id="category"
                          className="w-[95%] border-2 p-2 rounded-sm"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full">
                        <label htmlFor="tag" className="mb-2">
                          Tags/Keyword Story
                        </label>
                        <input
                          type="text"
                          id="tag"
                          className="w-[95%] border-2 p-2 rounded-sm mb-8"
                          placeholder="Tags/Keywords"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                      <div className="w-full">
                        <label htmlFor="cover" className="mb-2">
                          Cover Image
                        </label>
                        <input
                          type="file"  
                          id="cover"
                          className="w-[95%] border-2 p-2 rounded-sm"
                          onChange={(e) => setCover(e.target.value)}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="status" className="mb-2">
                          Status
                        </label>
                        <select
                          id="status"
                          className="w-[95%] border-2 p-2 rounded-sm mb-8"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Status
                          </option>
                          <option value="Publish">Publish</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <hr className="w-full border-2 border-gray-500" />
                    <div className="flex justify-end items-end ml-auto p-8">
                      <Link to="/AddChapter">
                        <button className="bg-blue-500 text-white p-2 rounded-md shadow-sm shadow-blue-400 transition-transform hover:scale-110 duration-300">
                          Add Chapter
                        </button>
                      </Link>
                    </div>
                    <div className="flex justify-end items-end ml-auto p-8">
                      <table className="w-[100%] table-auto bg-white rounded-md mb-14">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2 w-72 text-start">
                              Title
                            </th>
                            <th className="border px-4 py-2 w-56 text-start">
                              Last Update
                            </th>
                            <th className="border px-4 py-2 w-56 text-start">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td className="border px-4 py-2">{user.title}</td>
                              <td className="border px-4 py-2">{formatDate(user.updatedAt)}</td>
                              <td className='border px-4 py-2'>
                                  <div className='grid grid-cols-3 gap-2'>
                                    <button className='p-2 rounded' onClick={() => openEditModal(user)} type="button" >
                                      <img src={editImg} alt="edit" className="w-6" />
                                    </button>
                                    <button className='p-2 rounded ml-2' onClick={() => handleDeleteClick(user.id)} type="button">
                                      <img src={deleteImg} alt="" className="w-6" />
                                    </button>
                                    <button className='p-2 rounded ml-2' onClick={() => openDetailModal(user)} type="button" >
                                      <img src={detailImg} alt="Detail" className="w-6" />
                                    </button>
                                  </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-end ml-auto pt-4 mr-80">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="p-2 bg-white border-2 w-28 rounded-md shadow-sm shadow-blue-400 text-blue-500 border-blue-500 transition-transform hover:scale-110 duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="p-2 bg-blue-500 border w-28 rounded-md shadow-sm shadow-blue-400 text-white transition-transform hover:scale-110 duration-300"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showModal && (
          <Modal
            onClose={toggleModal}
            onConfirm={() => {
              toggleModal();
              navigate('/');
            }}
          />
        )}
         {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="font-bold text-xl mb-6 text-center text-gray-700">Edit Story</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                      <input
                        type="text"
                        className="border border-gray-300 p-3 rounded w-full"
                        name="title"
                        value={editStory.title}
                        onChange={updateEditStory}
                      />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">UpdatedAt:</label>
                      <input
                        type="text"
                        className="border border-gray-300 p-3 rounded w-full"
                        name="lastUpdate"
                        value={formatDate(editStory.updatedAt)}
                        readOnly
                      />
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      onClick={saveEditStory}
                    >
                    Save
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                    Cancel
                    </button>
                  </div>
                </div>
            </div>
            )}
            {isDeleteModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="font-bold text-xl mb-6 text-center text-gray-700">Hapus data?</h2>
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-4"
                        onClick={() => {
                        deleteUser(selectedUserId);
                        setIsDeleteModalOpen(false);
                        }}
                      >
                      Yes
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                        onClick={() => setIsDeleteModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isDetailModalOpen && selectedUserDetail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <h2 className="font-bold text-2xl mb-6 text-center text-gray-700">Chapter Detail</h2>

                    <table className="table-auto w-[50%] text-lg mx-auto">
                      <tbody>
                        <tr>
                          <td className="font-bold pr-2 pl-12 py-2 align-top text-left">Title</td>
                          <td>{selectedUserDetail.title}</td>
                        </tr>
                        <tr>
                          <td className="font-bold pr-2 pl-12 py-2 align-top text-left">LastUpdated</td>
                          <td>{formatDate(selectedUserDetail.updatedAt)}</td>
                        </tr>
                        <tr>
                          <td className="font-bold pr-2 pl-12 py-2 align-top text-left">Synopsis</td>
                          <td>
                            <span 
                              dangerouslySetInnerHTML={{ __html: selectedUserDetail.synopsis }} 
                              className="synopsis-content"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  <div className="mt-4 flex justify-center"> 
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 text-lg"
                      onClick={() => setIsDetailModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
      </div>
    </>
  );
};

export default AddStory;
