import React, { useState, useEffect } from 'react';
import { FaCalculator } from 'react-icons/fa';
import { HiLightBulb } from 'react-icons/hi';
import { SiLoopback } from 'react-icons/si';
import { GiCircuitry } from 'react-icons/gi';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const JobCategoryList = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const animationClass = inView ? 'animate-fade-up animate-delay-100 animate-once' : '';

    const data = [
        {
            id: 1,
            icon: <FaCalculator />,
            title: 'Govt. Jobs',
            count: "20927",
        },
        {
            id: 2,
            icon: <HiLightBulb />,
            title: 'Private Jobs',
            count: "65106",
        },
        {
            id: 3,
            icon: <SiLoopback />,
            title: 'Job Seekers',
            count: "1981286",
        },
        {
            id: 4,
            icon: <GiCircuitry />,
            title: 'Employers',
            count: "17082",
        },
    ];

    return (
        <div ref={ref} className={`p-4 mt-10 container mx-auto ${animationClass}`}>
            <div className='text-center'>
                <h2 className='text-3xl font-bold mb-2'>Job Category List</h2>
                <p>Explore thousands of job opportunities with all the information you need. It's your future.</p>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
                {data.map((item) => (
                    <Link to="/allJobs" key={item.id}> <JobCategoryCard key={item.id} icon={item.icon} title={item.title} count={item.count} /></Link>
                ))}
            </div>
        </div>
    );
};

const JobCategoryCard = ({ icon, title, count }) => {
    const [countDisplay, setCountDisplay] = useState(0);

    useEffect(() => {
        const animationDuration = 2; 
        const steps = 50; 

        const stepValue = count / steps;

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setCountDisplay(Math.floor(currentStep * stepValue));

            if (currentStep >= steps) {
                clearInterval(interval);
            }
        }, (animationDuration * 1000) / steps);

        return () => {
            clearInterval(interval);
        };
    }, [count]);

    return (
        <motion.div
            className='flex cursor-pointer hover:bg-gray-100 active flex-col items-start p-6 bg-[#7E90FE0D] rounded-lg'
            whileHover={{ scale: 1.05 }}
        >
            <div className='flex mb-3 items-center justify-center w-16 h-16 rounded-md bg-[#7E90FE1A] text-[#A49DFF] text-3xl'>
                {icon}
            </div>
            <div className='ml-0'>
                <h3 className='text-xl font-semibold'>{countDisplay}</h3>
                <p className='text-[#A3A3A3'>{title}</p>
            </div>
        </motion.div>
    );
};

export default JobCategoryList;
