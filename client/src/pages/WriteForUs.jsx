
import { useInView } from 'react-intersection-observer';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from "../components/Breadcrumb"

const WriteForUs = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const [ref, inView] = useInView({
        triggerOnce: true,
     });

    const animationClass = inView && 'animate-fade-up animate-delay-100 animate-once';


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div ref={ref} className={`p-4 container mx-auto ${animationClass}`}>
         <Breadcrumb>
          <h2 className='text-3xl font-bold mb-2'>
            Write for us
          </h2>
        </Breadcrumb>
        <p className="mb-4 text-bold text-lg">
          We welcome guest bloggers to contribute to our blog. If you have
          valuable insights, tips, or experiences to share with our audience,
          please submit your article using the form below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="author" className="block font-semibold">
              Your Name:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full border-2 bg-gray-100 rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border-2 bg-gray-100 rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full border-2 bg-gray-100 rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block font-semibold">
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows="6"
              className="w-full border-2 bg-gray-100 rounded-md py-2 px-3"
            ></textarea>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className=" bg-purple-400 hover:bg-purple-500 active text-white font-semibold py-2 px-4 rounded-md"
            >
              Submit Article
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WriteForUs;
