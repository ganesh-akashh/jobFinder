import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { HiLocationMarker } from 'react-icons/hi';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';

const AllJobs = () => {
    const [data, setData] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [jobTitleQuery, setJobTitleQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');




    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const filterJobs = () => {
        let filteredJobs = data.filter((job) => {
            const lowerJobTitle = job.jobTitle.toLowerCase();
            const lowerCompanyName = job.companyName.toLowerCase();
            const lowerSalary = job.salary.toLowerCase();
            const lowerJobDescription = job.jobDescription.toLowerCase();
            const lowerJobResponsibility = job.jobResponsibility.toLowerCase();
            const lowerEducationalRequirements = job.educationalRequirements.toLowerCase();
            const lowerExperiences = job.experiences.toLowerCase();
            const lowerLocation = job.location.toLowerCase();

            const jobTitleQueryLower = jobTitleQuery.toLowerCase();
            const locationQueryLower = locationQuery.toLowerCase();

            const optionMatches = job.options.some((option) =>
                option.toLowerCase().includes(jobTitleQueryLower)
            );

            if (
                (jobTitleQuery.trim() === "" ||
                    lowerJobTitle.includes(jobTitleQueryLower) ||
                    lowerCompanyName.includes(jobTitleQueryLower) ||
                    lowerSalary.includes(jobTitleQueryLower) ||
                    lowerJobDescription.includes(jobTitleQueryLower) ||
                    lowerJobResponsibility.includes(jobTitleQueryLower) ||
                    lowerEducationalRequirements.includes(jobTitleQueryLower) ||
                    lowerExperiences.includes(jobTitleQueryLower) ||
                    optionMatches) &&
                (locationQuery.trim() === "" || lowerLocation.includes(locationQueryLower))
            ) {
                return true;
            }

            return false;
        });

        setJobs(filteredJobs);
    };



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



    return (
        <div>
            <Navbar />
            <div ref={ref} className={`p-4 container mx-auto ${animationClass}`}>
                <Breadcrumb>
                    <h2 className='text-3xl font-bold mb-2'>Find the perfect job for you</h2>
                </Breadcrumb>
                <form onSubmit={(e)=>
                {e.preventDefault()
                 filterJobs();
                }}>
                    <div className="grid grid-cols-1 mt-3 gap-8 sm:gap-14 md:grid-cols-6 px-4 py-5">
                        <div className="w-full relative  col-span-3">
                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-2">
                                Search
                            </span>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setJobTitleQuery(e.target.value);
                                    filterJobs();
                                }}
                                className="w-full rounded border font-semibold shadow px-4 py-2 border-l-8 border-l-gray-500 focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none"
                            />
                            <span className="absolute top-3 right-4 cursor-pointer" >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                            </span>
                        </div>


                        <div className="w-full relative col-span-2">
                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-2">
                                Location
                            </span>
                            <input
                                type="text"
                                className="w-full rounded font-semibold border shadow px-4 py-2 border-l-8 border-l-gray-500 focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none"
                                onChange={(e) => {
                                    setLocationQuery(e.target.value);
                                    filterJobs();
                                }}
                            />
                            <span className="absolute top-3 right-4 cursor-pointer" >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className='w-5 h-5'>
                                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                </svg>
                            </span>
                        </div>

                        <div className='w-full relative' type="submit">
                            <button className='rounded-md active text-white py-2 px-4 bg-purple-400  hover:bg-purple-500'>Search</button>
                        </div>
                    </div>
                </form>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
                    {jobs.length === 0 ? (
                        <div className='text-center text-gray-600 text-lg'>
                            No results found.
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className='bg-white border rounded-md p-5'>
                                <img src={job.imageUrl} className='company-logo h-[50px] mb-3' alt={job.jobTitle} />
                                <h3 className='text-xl font-bold mb-2'>{job.jobTitle}</h3>
                                <p className='text text-gray-400 mb-4'>{job.companyName}</p>
                                <p>
                                    {job.options.map((option, index) => (
                                        <span
                                            key={index}
                                            className='text text-primary text-sm border rounded-md px-5 py-2 bg-gray-200 cursor-pointer border-primary mr-2'
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </p>
                                <div className='lg:flex items-center mb-5'>
                                    <p className='mt-4 text-gray-500 flex items-center text-sm'>
                                        <HiLocationMarker className='mr-2' /> {job.location}
                                    </p>
                                    <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                                        <BiRupee className='mr-2' /> Salary: {job.salary}
                                    </p>
                                </div>
                                <Link to={`/job-details?id=${job.id}`}>
                                    <button
                                        className='rounded-md active text-white py-3 px-4 bg-purple-400  hover:bg-purple-500'
                                        to={`/job-details?id=${job.id}`}
                                        state={{ id: job.id }}
                                    >
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllJobs;
