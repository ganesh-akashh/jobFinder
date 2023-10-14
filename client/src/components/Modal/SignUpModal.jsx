import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch } from 'react-redux';
import { setModal } from '../../features/modal/modalSlice';
import { updateUserDetails } from '../../features/user/userSlice';

const SignUpSchema = Yup.object().shape({
  userName: Yup.string().required('Name is required*'),
  email: Yup.string().email('Invalid email').required('Email is required*'),
  password: Yup.string().min(6, 'Password must be at least 6 characters*').required('Password is required*'),
});

const SignUpModal = ({ handleToggle, closeModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = ({ userName, email}) => {
    dispatch(setModal({ modalName: 'welcomeModal' }));
    dispatch(updateUserDetails({userName,email}))
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative animate-fade animate-delay-75 animate-once w-11/12 max-w-md sm:w-8/12 md:w-6/12 lg:w-4/12 ">
      <Formik
        initialValues={{
          userName: '',
          email: '',
          password: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <button
            onClick={closeModal}
            className="absolute top-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="font-bold mb-3 flex justify-center items-center text-2xl">
            Sign up for{' '}
            <span className="text_gradient text-center ml-1 text-2xl cursor-pointer font-bold active">
              JobFinder.
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <Field
              type="text"
              name="userName"
              className="w-full px-4 py-2  text-gray-800 font-semibold border rounded-md focus:outline-none focus:border-black"
              placeholder="Enter your Name"
            />
            <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <Field
              type="email"
              className="w-full px-4 py-2 text-gray-800 border font-semibold rounded-md focus:outline-none focus:border-black"
              placeholder="Enter your email"
              name="email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <Field
              type="password"
              name="password"
              className="w-full px-4 text-gray-800 py-2 border font-semibold rounded-md focus:outline-none focus:border-black"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className={`cursor-pointer w-full mt-1 bg-purple-400 hover:bg-purple-500 active text-white font-semibold px-4 py-2 rounded}`}
          >
            Sign Up
          </button>
        </Form>
      </Formik>
      <p className="mt-4 text-center">
        Already a member?
        <span className="text-blue-500 cursor-pointer ml-1" onClick={handleToggle}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignUpModal;
