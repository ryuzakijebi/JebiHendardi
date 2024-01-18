import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import NavigationBar from '../Component/Navbar';
import Sidebar from '../Component/Sidebar';
import filterImg from '../Assets/filter.png';
import detailImg from '../Assets/detail.png';
import deleteImg from '../Assets/delete.png';
import editImg from '../Assets/edit.png';

const Test = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editStory, setEditStory] = useState({
        title: '',
        writer: '',
        synopsis: '',
        category: '',
        tag: '',
        cover: '',
        status: '',
    });

    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedUserDetail, setSelectedUserDetail] = useState(null);

    const openDetailModal = (user) => {
        setSelectedUserDetail(user);
        setIsDetailModalOpen(true);
      };

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setIsDeleteModalOpen(true);
      };

    const applyFilter = () => {
        const filtered = users.filter(user =>
            (filterCategory ? user.category === filterCategory : true) &&
            (filterStatus ? user.status === filterStatus : true)
        );
        setFilteredUsers(filtered);
        setIsModalOpen(false);
    };
    
    const resetFilter = () => {
        setFilterCategory('');
        setFilterStatus('');
        setFilteredUsers(users);
        setIsModalOpen(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users);
        } else {
            const searchResults = users.filter(user =>
                user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.writer.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(searchResults);
        }
    }, [searchTerm, users]);

    const openEditModal = (story) => {
        setEditStory(story);
        setIsEditModalOpen(true);
    };

    const updateEditStory = (e) => {
        setEditStory({ ...editStory, [e.target.name]: e.target.value });
    };

    const saveEditStory = () => {
        const updatedUsers = users.map(user => {
            if (user.id === editStory.id) {
                return editStory; 
            }
            return user; 
        });
    
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers); 
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

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
            setFilteredUsers(response.data); 
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    return (
        <>
        <NavigationBar />
            <div className="w-full h-screen bg-slate-200">
                <div className="flex justify-start w-56 float-start">
                    <Sidebar />
                </div>
                <div className="w-full">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex justify-start items-start p-4">
                                <h1 className='text-[2rem] font-bold text-gray-500'>List Story</h1>
                            </div>
                            <div className="flex items-center p-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="p-2 border border-gray-300 rounded mr-2 w-[65%]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="flex justify-center items-center rounded-full w-10 h-10 bg-white overflow-hidden ml-3">
                                <button onClick={() => setIsModalOpen(true)}>
                                    <img src={filterImg} alt="" className="w-6"/>
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <Link to="/add-story">
                                        <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-transform hover:scale-110 duration-300 ml-5">
                                            Add Story
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start items-end ml-auto mr-14">
                            <table className='w-[100%] table-auto bg-white rounded-md'>
                                <thead>
                                    <tr>
                                        <th className='border px-4 py-2 w-72'>Title</th>
                                        <th className='border px-4 py-2 w-56'>Writes</th>
                                        <th className='border px-4 py-2 w-56'>Category</th>
                                        <th className='border px-4 py-2 w-48'>Tags</th>
                                        <th className='border px-4 py-2 w-48'>Status</th>
                                        <th className='border px-4 py-2 w-48'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className='border px-4 py-2'>{user.title}</td>
                                            <td className='border px-4 py-2'>{user.writer}</td>
                                            <td className='border px-4 py-2'>{user.category}</td>
                                            <td className='border px-4 py-2'>
                                                <span className="inline-block px-2 py-1 text-xs font-bold leading-none text-center whitespace-nowrap align-baseline rounded text-white bg-blue-500">
                                                    {user.tag}
                                                </span>
                                            </td>
                                            <td className='border px-4 py-2'>
                                                <span className="inline-block px-2 py-1 text-xs font-bold leading-none text-center whitespace-nowrap align-baseline rounded text-white bg-blue-500">
                                                    {user.status}
                                                </span>
                                            </td>

                                            <td className='border px-4 py-2'>
                                                <div className='grid grid-cols-3 gap-2'>
                                                    <button className='p-2 rounded' onClick={() => openEditModal(user)}>
                                                        <img src={editImg} alt="edit" className="w-6" />
                                                    </button>
                                                    <button className='p-2 rounded ml-2' onClick={() => handleDeleteClick(user.id)}>
                                                        <img src={deleteImg} alt="" className="w-6" />
                                                    </button>
                                                    <button className='p-2 rounded ml-2' onClick={() => openDetailModal(user)}>
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
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="font-bold text-xl mb-6 text-center text-gray-700">Filter</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                                <select 
                                    className="border border-gray-300 p-3 rounded w-full"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Health">Health</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                                <select 
                                    className="border border-gray-300 p-3 rounded w-full"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Publish">Publish</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button 
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 ml-0"
                                    onClick={resetFilter}
                                >
                                    Reset
                                </button>
                                <button 
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 ml-20"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ml-2"
                                    onClick={applyFilter}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2">Writer:</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-3 rounded w-full"
                                    name="writer"
                                    value={editStory.writer}
                                    onChange={updateEditStory}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Synopsis:</label>
                                <textarea
                                    className="border border-gray-300 p-3 rounded w-full"
                                    name="synopsis"
                                    value={editStory.synopsis}
                                    onChange={updateEditStory}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                                <select
                                    className="border border-gray-300 p-3 rounded w-full"
                                    name="category"
                                    value={editStory.category}
                                    onChange={updateEditStory}
                                >
                                    <option value="Financial">Financial</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Health">Health</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Tag:</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-3 rounded w-full"
                                    name="tag"
                                    value={editStory.tag}
                                    onChange={updateEditStory}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                                <select
                                    className="border border-gray-300 p-3 rounded w-full"
                                    name="status"
                                    value={editStory.status}
                                    onChange={updateEditStory}
                                >
                                    <option value="Publish">Publish</option>
                                    <option value="Draft">Draft</option>
                                </select>
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
                        <h2 className="font-bold text-2xl mb-6 text-center text-gray-700">Story Detail</h2>

                        <table className="table-auto w-[50%] text-lg mx-auto"> 
                            <tbody>
                            <tr>
                                <td className="font-bold pr-2 pl-12 py-2">Title</td>
                                <td>: {selectedUserDetail.title}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-2 pl-12 py-2">Writer</td>
                                <td>: {selectedUserDetail.writer}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-2 pl-12 py-2">Category</td>
                                <td>: {selectedUserDetail.category}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-2 pl-12 py-2">Tags</td>
                                <td>: {selectedUserDetail.tag}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-2 pl-12 py-2">Status</td>
                                <td>: {selectedUserDetail.status}</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-2 pl-12 py-2">Synopsis</td>
                                <td>: {selectedUserDetail.synopsis}</td>
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

export default Test;