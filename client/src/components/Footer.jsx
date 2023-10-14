import React from 'react';
import { Link } from 'react-router-dom';
import fb from '../assets/fb.png';
import tw from '../assets/tw.png';
import insta from '../assets/insta.png';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
    
     const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const animationClass = inView && 'animate-fade-up animate-delay-100 animate-once' ;

   
    return (
        <div ref={ref} className= {`p-4 bg-[#1A1919] mt-20 ${animationClass}`}>
            <div className='container mx-auto p-4'>
                <footer className="flex flex-col lg:flex-row text-white">
                    <div className='lg:w-2/6'>
                        <Link to={'/'} className="font-extrabold  text-left p-0 bg-transparent hover:bg-transparent border-none normal-case text-xl">
                            <span className='text_gradient active'>JobFinder</span>
                        </Link>
                        <p className='py-2 md:block hidden text-sm lg:w-[300px]'>
                            job finder is a tool or platform designed to help job seekers find employment opportunities. These resources can include job boards, networking events, and career fairs.
                        </p>

                        <div className='flex mt-4'>
                            <a  className='mr-4 cursor-pointer'>
                                <img alt='' src={fb} style={{ width: "35px" }} />
                            </a>
                            <a  className='mr-4 cursor-pointer'>
                                <img alt='' src={tw} style={{ width: "35px" }} />
                            </a>
                            <a  className='mr-4 cursor-pointer'>
                                <img alt='' src={insta} style={{ width: "35px" }} />
                            </a>
                        </div>
                    </div>
                    <div className='lg:w-1/6 p-2 flex flex-col'>
                        <span className="text-gray-400 font-semibold ">Company</span>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">About Us</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Work</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Latest News</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Careers</Link>
                    </div>
                    <div className='lg:w-1/6 p-2 flex flex-col'>
                        <span className="text-gray-400 font-semibold ">Product</span>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Prototype</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Plans & Pricing</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Customers</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Integrations</Link>
                    </div>
                    <div className='lg:w-1/6 p-2 flex flex-col'>
                        <span className="text-gray-400 font-semibold">Support</span>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Help Desk</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Sales</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Become a Partner</Link>
                        <Link to='/' className="text-sm hover:text-purple-200 sm:text-sm md:text-md">Developers</Link>
                    </div>
                    <div className='lg:w-1/6 p-2 flex flex-col'>
                        <span className="text-gray-400 font-semibold">Contact</span>
                        <Link to='/' className="text-sm  hover:text-purple-200 sm:text-sm md:text-md">524 Broadway , NYC</Link>
                        <Link to='/' className="text-sm  hover:text-purple-200 sm:text-sm md:text-md">+1 777 - 978 - 5570</Link>
                    </div>
                </footer>

                <hr className='text-[#7E90FE33] my-10' />

                <div className='lg:flex justify-between items-center'>
                    <p className='text-gray-300 text-sm lg:w-auto'>© 2021 JobFinder. All rights reserved.</p>
                    <p className='text-gray-300 text-sm lg:w-auto'>
                        Powered by CareerHub
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
