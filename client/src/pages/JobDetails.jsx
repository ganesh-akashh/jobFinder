
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from "../components/Breadcrumb"
import Details from '../components/Details';
import Navbar from "../components/Navbar"
import { useInView } from 'react-intersection-observer';
import Footer from "../components/Footer"
const JobDetails = () => {

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

  
    const animationClass = inView && 'animate-fade-up animate-delay-100  animate-duration-1000 animate-ease-out';

    const id = new URLSearchParams(location.search).get('id');
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('./data.json')
            .then(res => res.json())
            .then(data => {
                const job = data.find(job => job.id === id);
                setData(job);
            })
    }, [id]);

    return (
        <>
            <Navbar />
            <div ref={ref} className={`p-4 container mx-auto  ${animationClass} `}>
                <Breadcrumb>
                    <img src={data.imageUrl} className='block mx-auto mb-4 h-[80px]' alt='' />
                    <h2 className='text-3xl font-bold mb-2'>
                        {data?.jobTitle}
                    </h2>
                    <p>
                        {data?.companyName}
                    </p>
                </Breadcrumb>
                <Details job={data} />
              
            </div>
            <Footer />
        </>
    );
};

export default JobDetails;