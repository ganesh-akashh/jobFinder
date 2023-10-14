import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import hero from "../assets/hero.png"

const Hero = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const animationClass = inView && 'animate-fade-up animate-delay-100 animate-once';


    return (
        <div ref={ref} className={`p-4 mt-20  ${animationClass}`}>
            <div className='lg:flex container mx-auto'>
                <div className='lg:w-1/2 w-full'>
                    <div className='lg:w-4/5 w-full my-auto'>
                        <h1 className='lg:text-5xl text-4xl font-bold'>
                            Let's Find your <br />{' '}
                            <span className='text_gradient font-bold'>dream job</span>
                        </h1>
                        <p className='text-xl mt-8 mb-8'>
                            Job finder is a tool or platform designed to help job seekers find
                            employment opportunities. These resources can include job boards,
                            networking events, and career fairs.
                        </p>


                        <Link to="/allJobs">
                        <button className='rounded-md text-white py-3 px-4 ml-1 cursor-pointer bg-purple-400  hover:bg-purple-500 active'>
                          <p className='flex font-semibold items-center'>Get Started</p> 
                        </button>
                        </Link>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <img
                        className='block mx-auto lg:mx-0 mt-4 lg:mt-0'
                        src={hero}
                        alt='hero'
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
