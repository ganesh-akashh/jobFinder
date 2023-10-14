import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalForm from '../pages/ModalForm';
import { AiFillDelete, AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import userIcon from "../assets/userIcon.png"
import { closeModal, openModal, showModalInfo } from '../features/modal/modalSlice';
import { useDispatch, useSelector } from "react-redux"
import { userDetails } from '../features/user/userSlice';

const Navbar = () => {
    const userInfo = useSelector(userDetails);
    const modalInfo = useSelector(showModalInfo);
    const dispatch = useDispatch();
    const isModalOpen = modalInfo.isModalOpen;
    const [isMenuToggled, setIsMenuToggled] = useState(false);


    const backGroundColor = isModalOpen ? '' : 'bg-white';
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDeleteClick = (e) => {
        deleteUser();
        navigate("/");
    }

    const handleToggleClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }



    return (
        <nav className={`container mx-auto relative  ${backGroundColor} px-2 py-3 border-b-2`}>
            <div className='w-full top-0 flex justify-between items-center'>
                <Link to="/"> <h2 className='text_gradient  text-3xl cursor-pointer font-bold active'>JobFinder.</h2></Link>

                <ul className='hidden md:flex gap-1 items-center justify-center'>
                    <Link to="/">
                        <li className='rounded-md hover:bg-gray-200 py-2 px-4 cursor-pointer active '>
                            <p className="flex font-semibold items-center">
                                Home
                            </p>
                        </li>
                    </Link>
                    <Link to="/allJobs">
                        <li className='rounded-md hover:bg-gray-200 py-2 px-4 cursor-pointer active'>
                            <p className="flex font-semibold items-center">
                                Jobs
                            </p>
                        </li>
                    </Link>
                    {/* 
                    <Link to="/postJobs">
                        <li className='rounded-md hover:bg-gray-200 py-2 px-4 cursor-pointer active'>
                            <p className="flex font-semibold items-center">
                                Post a Job
                            </p>
                        </li>
                    </Link> */}
                    <Link to="/blogs">
                        <li className='rounded-md hover:bg-gray-200 py-2 px-4 cursor-pointer active'>
                            <p className="flex font-semibold items-center">
                                Blogs
                            </p>
                        </li>
                    </Link>
                    {userInfo.isLoggedIn === false ?
                        <li className={` ${!isModalOpen && ' text-white'} rounded-full cursor-pointer`}>
                            <button onClick={() => dispatch(openModal())} className='rounded-md text-white py-3 px-4 ml-1 cursor-pointer bg-purple-400  hover:bg-purple-500 active '>
                                <p className="flex font-semibold items-center">
                                    Sign In
                                </p>
                            </button>
                        </li>
                        :
                        <li
                            className='rounded-full  cursor-pointer'
                        >
                            <div
                                onClick={handleToggleClick}
                                className='relative'
                            >
                                <button className='px-2 py-2 '>
                                    <p className='flex active text-lg items-center justify-center font-semibold'>
                                        <img src={userIcon} className='w-12 h-12 rounded-full object-cover mr-3' />
                                        <h3 className=' from-stone-950 font-bold'>{userInfo.userName}</h3>
                                    </p>
                                </button>
                                {isDropdownOpen && (
                                    <div
                                        className="absolute bg-white border rounded-md border-gray-300 mt-2 py-2  text-gray-700 shadow-lg z-50 w-44 animate-fade-left animate-delay-100 animate-once"
                                        id="userOptions"
                                    >
                                        <Link to="/"><p className="px-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer  justify-between flex items-center">Profile<AiOutlineUser className='h-4 w-4' /></p></Link>
                                        <p className="px-4 py-2 font-semibold  cursor-pointer flex  justify-between items-center hover:bg-gray-100  gap-3" onClick={handleSignOutClick} >Sign Out<AiOutlineLogout className='h-4 w-4 ' /></p>
                                        <p className='px-4 py-2 font-semibold cursor-pointer flex justify-between items-center hover:bg-gray-100 gap-3' onClick={handleDeleteClick}>Delete Account<i><AiFillDelete /></i> </p>
                                    </div>
                                )}
                            </div>
                        </li>
                    }

                </ul>
                <div
                    className='mmd:hidden rounded-full  hover:bg-gray-300 cursor-pointer p-2'
                    onClick={() => isMenuToggled ? setIsMenuToggled(false) : setIsMenuToggled(true)}
                >
                    {
                        !isMenuToggled ? (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )
                    }
                </div>
            </div>

            {
                isMenuToggled && (
                    <div className='flex bg-white mmd:hidden flex-col w-[170px] justify-center absolute animate-fade-left animate-delay-100 animate-once bg-white rounded-sm shadow-md right-0 '>

                        <Link to={"/"}>
                            <p className='flex font-semibold items-center cursor-pointer px-4 py-3 hover:bg-gray-300'>
                                Home
                            </p>
                        </Link>

                        <Link to={"/allJobs"}>
                            <p className='flex font-semibold items-center cursor-pointer px-3 py-3 hover:bg-gray-300'>
                                Jobs
                            </p>
                        </Link>
                        {/* 
                        <Link to={"/postJobs"}>
                            <p className='flex font-semibold items-center cursor-pointer px-3 py-3 hover:bg-gray-300'>
                                Post a Job
                            </p>
                        </Link> */}
                        <Link to={"/blogs"}>
                            <p className='flex font-semibold items-center cursor-pointer px-3 py-3 hover:bg-gray-300'>
                                Blogs
                            </p>
                        </Link>

                        {userInfo.isLoggedIn === false ?
                            <li className={` ${!isModalOpen && ' text-white'} rounded-full cursor-pointer`}>
                                <button onClick={() => dispatch(openModal())} className='rounded-md text-white py-3 px-4 ml-1 cursor-pointer bg-purple-400  hover:bg-purple-500 w-full active '>
                                    <p className="flex font-semibold items-center">
                                        Sign In
                                    </p>
                                </button>
                            </li>
                            :
                            <li
                                className='rounded-full  cursor-pointer'
                            >
                                <div
                                    onClick={handleToggleClick}
                                    className='relative '
                                >
                                    <button className='px-2 py-2 '>
                                        <p className='flex active text-lg items-center justify-center font-semibold'>
                                            <img src={userIcon} className='w-12 h-12 rounded-full object-cover mr-3' />
                                            <h3 className=' from-stone-950 font-bold'>{userInfo.userName}</h3>
                                        </p>
                                    </button>
                                    {isDropdownOpen && (
                                        <div
                                            className="absolute bg-white border rounded-md border-gray-300 mt-2 py-2  text-gray-700 shadow-lg z-50 w-44 animate-fade-left animate-delay-100 animate-once"
                                            id="userOptions"
                                        >
                                            <Link to="/"><p className="px-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer  justify-between flex items-center">Profile<AiOutlineUser className='h-4 w-4' /></p></Link>
                                            <p className="px-4 py-2 font-semibold  cursor-pointer flex  justify-between items-center hover:bg-gray-100  gap-3" onClick={handleSignOutClick} >Sign Out<AiOutlineLogout className='h-4 w-4 ' /></p>
                                            <p className='px-4 py-2 font-semibold cursor-pointer flex justify-between items-center hover:bg-gray-100 gap-3' onClick={handleDeleteClick}>Delete Account<i><AiFillDelete /></i> </p>
                                        </div>
                                    )}
                                </div>
                            </li>
                        }
                    </div>
                )
            }

            <div >
                <ModalForm isOpen={isModalOpen} closeModal={() => dispatch(closeModal())} />
            </div>
        </nav>

    );
}

export default Navbar;


