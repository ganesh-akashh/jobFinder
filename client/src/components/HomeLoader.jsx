import React from 'react';
import { motion } from 'framer-motion';

const HomeLoader = () => {
  const text = 'JobFinder.';

  return (
    <div className='h-screen flex items-center justify-center'>
      <h2 className={`text_gradient text-7xl cursor-pointer font-bold`}>
        {text}
      </h2>
    </div>
  );
};

export default HomeLoader;
