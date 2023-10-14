import React, { useState } from 'react';
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useDispatch } from 'react-redux';
import { setModal } from '../../features/modal/modalSlice';


const passwordSchema = Yup.object().shape({
    userEmail: Yup.string().email('Invalid email').required('Email is required*'),
    password: Yup.string().min(6, 'Password must be least 6 characters').required('Password is required')
})

const Password = ({ closeModal }) => {


    const dispatch = useDispatch();
    const handelSubmit = ({ userEmail, password }) => {

    }
    return (
        <div className="bg-white p-8 animate-fade animate-delay-75 animate-once rounded-lg shadow-md relative w-11/12 max-w-md sm:w-8/12 md:w-6/12 lg:w-4/12">
            <Formik
                initialValues={{
                    userEmail: '',
                    password: ''
                }}
                validationSchema={passwordSchema}
                handelSubmit={handelSubmit}
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
                    <button
                        onClick={() => dispatch(setModal({ modalName: "signInModal" }))}
                        className="absolute top-0 mt-2.5  ml-2.5 text-gray-500 hover:text-gray-700 left-0"
                    >
                        <svg className='h-5 w-5 t' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" stroke="currentColor"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                    </button>
                    <h2 className='font-semibold mb-4 flex justify-center items-center text-2xl'>
                        Forget your password ?
                    </h2>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-semibold mb-2'>Email</label>
                        <Field
                            type='Email'
                            name='userEmail'
                            placeholder='Enter your email'
                            className='w-full text-gray-800 font-semibold px-4 py-2 border rounded-md focus:outline-none focus:border-black'
                        />
                        <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='mb-3'>
                        <label className='block text-gray-700 font-semibold mb-2 '>Password</label>
                        <Field
                            type='password'
                            name='password'
                            placeholder='Enter the new password'
                            className='w-full px-4 text-gray-800 font-semibold py-2 border rounded-md focus:outline-none focus:border-black'
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        <div className='mb-4'></div>

                        <button
                            type="submit"
                            className={`cursor-pointer w-full mt-1 bg-purple-400 hover:bg-purple-500 active text-white font-semibold px-4 py-2 rounded }`}
                        >
                            Change password
                        </button>

                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Password