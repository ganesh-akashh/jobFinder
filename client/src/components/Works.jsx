import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import signIn from '../assets/singIn.png';
import searchJob from '../assets/searchJob.png';
import applyForAJob from '../assets/applyForAJob.png';

const Works = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const animationClass = inView && 'animate-fade-up animate-delay-100 animate-once';

  return (
    <div ref={ref} className={`p-4 mx-auto container mt-10  ${animationClass}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">How it Works</h2>
        <p >
          Our platform simplifies the job search process into three easy steps:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-10 mt-8 animate-fade-left animate-delay-100 animate-once">
        <div className="bg-gray-100 rounded-sm p-4 text-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <img className="company-logo mx-auto mb-2 sm:w-16 sm:h-16 md:w-auto md:h-auto" src={signIn} alt="Register an Account" />
          <p className="font-semibold text-lg">Register An Account</p>
        </div>
        <div className="bg-gray-100 rounded-md p-4 text-center hover:shadow-lg transform hover:scale-105  transition duration-300 ease-in-out">
          <img className="company-logo mx-auto mb-2 sm:w-16 sm:h-16 md:w-auto md:h-auto" src={searchJob} alt="Search for a Job" />
          <p className="font-semibold text-lg">Search Your Job</p>
        </div>
        <div className="bg-gray-100 rounded-md p-4 text-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <img className="company-logo mx-auto mb-2 sm:w-16 sm:h-16 md:w-auto md:h-auto" src={applyForAJob} alt="Apply for a Job" />
          <p className="font-semibold text-lg">Apply for  Job</p>
        </div>
      </div>
    </div>
  );
};

export default Works;
