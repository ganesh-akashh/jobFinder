import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'
import { BiDollarCircle } from 'react-icons/bi'
import { useInView } from 'react-intersection-observer';

const FeaturedJobs = () => {
    const [data, setData] = useState([]);

    const [jobs, setJobs] = useState([])
    const [btnText, setBtnText] = useState('View All Jobs')
     const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const animationClass = inView && 'animate-fade-up animate-delay-100 animate-once';


    useEffect(() => {
        fetch('./data.json')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setJobs(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
       setJobs(data.slice(0, 6))
    }, [data])

    return (
        <div ref={ref} className={`p-4 mx-auto container mt-20 ${animationClass}`}>
            <div className='text-center'>
                <h2 className='text-3xl font-bold mb-2'>
                    Featured Jobs
                </h2>
                <p>
                    Explore thousands of job opportunities with all the information you need. Its your future
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
                {
                    jobs.map(job => (
                        <div key={job.id} className='bg-white border rounded-md p-3'>
                            <img src={job.imageUrl} className="company-logo h-[50px] mb-3" alt={job.jobTitle} />
                            <h3 className='text-xl font-bold mb-2'>{job.jobTitle}</h3>
                            <p className='text text-gray-400 mb-4'>{job.companyName}</p>
                            <p>
                                {
                                    job.options.map((option, index) => (
                                        <span key={index} className='text text-primary text-sm border rounded-md px-5 py-2 border-primary mr-2'>{option}</span>
                                    ))
                                }
                            </p>
                            <div className='lg:flex items-center mb-5'>
                                <p className='mt-4 text-gray-500 flex items-center text-sm'>
                                    <HiLocationMarker className='mr-2' /> {job.location}
                                </p>
                                <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                                    <BiDollarCircle className='mr-2' /> Salary: {job.salary}
                                </p>
                            </div>
                            <Link to={`/job-details?id=${job.id}`} > 
                                <button className='rounded-md active text-white py-3 px-4 bg-purple-400  hover:bg-purple-500' state={{ id: job.id }}>
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default FeaturedJobs