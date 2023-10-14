import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import { Link } from 'react-router-dom';
import AllJobs from './pages/AllJobs';
import JobDetails from './pages/JobDetails';
import Blogs from './pages/Blogs';
import WriteForUs from './pages/WriteForUs';
import alanBtn from "@alan-ai/alan-sdk-web";
import { BsChatFill } from "react-icons/bs";
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';
import { showModalInfo } from './features/modal/modalSlice';

const alanKey = import.meta.env.VITE_ALAN_API_KEY;

const App = () => {

  const navigate = useNavigate();
  const locaton = useLocation();

  const modalInfo = useSelector(showModalInfo);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: (commandData) => {
        console.log("Received command:", commandData.command);
        if (commandData.command === "HomePage") {
          navigate("/");
        } else if (commandData.command === "JobsPage") {
          navigate("/allJobs");
        } else if (commandData.command === "BlogsPage") {
          navigate("/blogs");
        }
      },
    });
  }, [navigate]);

  return (
    <div className="app-container relative">

      {location.pathname != "/chat" && !modalInfo.isModalOpen && (
        <Link to="/chat">
          <div className="fixed-svg text-4xl fixed  bottom-32 right-6  text-slate-100 z-50 rounded-full p-3  bg-[#b119ff] cursor-pointer">
            <BsChatFill />
          </div>
        </Link>)}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allJobs' element={<AllJobs />} />
        <Route path='/job-details' element={<JobDetails />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/writeBlogPost' element={<WriteForUs />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
