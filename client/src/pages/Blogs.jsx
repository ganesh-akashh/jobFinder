import React, { useState } from 'react';
import Breadcrumb from "../components/Breadcrumb"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogData } from '../utilities';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import { useInView } from 'react-intersection-observer';

const Blogs = () => {
  const data = blogData;
  const initialReactions = Object.fromEntries(data.map((blog, index) => [index, {
    likes: 0,
    dislikes: 0,
    hearts: 0,
    laughs: 0,
    claps: 0,
  }]));

  const [reactions, setReactions] = useState(initialReactions);

  const handleReactionClick = (postId, reactionType) => {
    setReactions((prevReactions) => {
      const updatedReactions = { ...prevReactions };
      updatedReactions[postId][reactionType] += 1;
      return updatedReactions;
    });
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const animationClass = inView ? 'animate-fade-up animate-delay-100 animate-once' : '';

  return (
    <>
      <Navbar />
      <div ref={ref} className={`p-4 container mx-auto ${animationClass}`}>
        <Breadcrumb>
          <h2 className='text-3xl font-bold mb-2'>
            Blogs
          </h2>
        </Breadcrumb>

        <div className="flex justify-center sm:justify-end">
          <Link to="/writeBlogPost">
            <button
              className=" text-white bg-purple-400 hover:bg-purple-500 active font-bold py-2 px-4 rounded-full mb-4 flex items-center"
            >
              Write your own Blog
              <FaArrowRight className="ml-2" />
            </button>
          </Link>
        </div>

        <div className='mt-8'>
          <div className='grid grid-cols-1 gap-6'>
            {data.map((blog, index) => (
              <div key={index} className='bg-white border rounded-md p-5'>
                <h3 className='text-xl font-bold mb-2'>
                  {index + 1} - {blog.question}
                </h3>
                <p className='text text-gray-400'>{blog.answer}</p>
                <div className='flex justify-between items-center'>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => handleReactionClick(index, 'likes')}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer mr-2"
                    >
                      👍
                    </button>
                    {reactions[index].likes}

                    <button
                      onClick={() => handleReactionClick(index, 'dislikes')}
                      className="text-red-500 hover:text-red-700 cursor-pointer ml-4 mr-2"
                    >
                      👎
                    </button>
                    {reactions[index].dislikes}

                    <button
                      onClick={() => handleReactionClick(index, 'hearts')}
                      className="text-red-500 hover:text-red-700 cursor-pointer ml-4 mr-2"
                    >
                      ❤️
                    </button>
                    {reactions[index].hearts}

                    <button
                      onClick={() => handleReactionClick(index, 'laughs')}
                      className="text-red-500 hover:text-red-700 cursor-pointer ml-4 mr-2"
                    >
                      😄
                    </button>
                    {reactions[index].laughs}

                    <button
                      onClick={() => handleReactionClick(index, 'claps')}
                      className="text-red-500 hover:text-red-700 cursor-pointer ml-4 mr-2"
                    >
                      👏
                    </button>
                    {reactions[index].claps}
                  </div>
                  <p className='text-gray-500 mt-2 cursor-pointer'>~{blog.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
