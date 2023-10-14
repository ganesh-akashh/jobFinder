// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { useInView } from 'react-intersection-observer';
// import Breadcrumb from '../components/Breadcrumb'

// const PostJobs = () => {
//   const [jobData, setJobData] = useState({
//     jobTitle: '',
//     company: '',
//     location: '',
//     jobDescription: '',
//     contactEmail: '',
//     applicationDeadline: '',
//     requiredSkills: '',
//     educationLevel: '',
//     benefits: '',
//     howToApply: '',
//     companyDescription: '',
//     jobCategory: '',
//     companyWebsite: '',
//     phoneNumber: '',
//     linkedInProfile: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setJobData({ ...jobData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//    const [ref, inView] = useInView({
//         triggerOnce: true,
//     });

//     const animationClass = inView && 'animate-fade-up animate-delay-100 animate-once';


//   return (
//     <>
//       <Navbar />
//       <div ref={ref} className={`container p-4 mx-auto mt-10 ${animationClass}`}>
//        <Breadcrumb>
//           <h2 className='text-3xl font-bold mb-2'>
//             Let's hire your next candidate
//           </h2>
//         </Breadcrumb> 
//         <form onSubmit={handleSubmit}>
//           <div className='mb-4'>
//             <label htmlFor='jobTitle' className='block font-semibold'>
//               Job Title:
//             </label>
//             <input
//               type='text'
//               id='jobTitle'
//               name='jobTitle'
//               value={jobData.jobTitle}
//               onChange={handleInputChange}
//               required
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='company' className='block font-semibold'>
//               Company:
//             </label>
//             <input
//               type='text'
//               id='company'
//               name='company'
//               value={jobData.company}
//               onChange={handleInputChange}
//               required
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='location' className='block font-semibold'>
//               Location:
//             </label>
//             <input
//               type='text'
//               id='location'
//               name='location'
//               value={jobData.location}
//               onChange={handleInputChange}
//               required
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='jobDescription' className='block font-semibold'>
//               Job Description:
//             </label>
//             <textarea
//               id='jobDescription'
//               name='jobDescription'
//               value={jobData.jobDescription}
//               onChange={handleInputChange}
//               required
//               rows='6'
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             ></textarea>
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='contactEmail' className='block font-semibold'>
//               Contact Email:
//             </label>
//             <input
//               type='email'
//               id='contactEmail'
//               name='contactEmail'
//               value={jobData.contactEmail}
//               onChange={handleInputChange}
//               required
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='applicationDeadline' className='block font-semibold'>
//               Application Deadline:
//             </label>
//             <input
//               type='date'
//               id='applicationDeadline'
//               name='applicationDeadline'
//               value={jobData.applicationDeadline}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='requiredSkills' className='block font-semibold'>
//               Required Skills:
//             </label>
//             <input
//               type='text'
//               id='requiredSkills'
//               name='requiredSkills'
//               value={jobData.requiredSkills}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='educationLevel' className='block font-semibold'>
//               Education Level:
//             </label>
//             <input
//               type='text'
//               id='educationLevel'
//               name='educationLevel'
//               value={jobData.educationLevel}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='benefits' className='block font-semibold'>
//               Benefits:
//             </label>
//             <input
//               type='text'
//               id='benefits'
//               name='benefits'
//               value={jobData.benefits}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='howToApply' className='block font-semibold'>
//               How to Apply:
//             </label>
//             <textarea
//               id='howToApply'
//               name='howToApply'
//               value={jobData.howToApply}
//               onChange={handleInputChange}
//               rows='6'
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             ></textarea>
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='companyDescription' className='block font-semibold'>
//               Company Description:
//             </label>
//             <textarea
//               id='companyDescription'
//               name='companyDescription'
//               value={jobData.companyDescription}
//               onChange={handleInputChange}
//               rows='6'
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             ></textarea>
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='jobCategory' className='block font-semibold'>
//               Job Category:
//             </label>
//             <input
//               type='text'
//               id='jobCategory'
//               name='jobCategory'
//               value={jobData.jobCategory}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//            <div className='mb-4'>
//             <label htmlFor='salary' className='block font-semibold'>
//               Salary:
//             </label>
//             <input
//               type='number'
//               id='salary'
//               name='salary'
//               value={jobData.salary}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='companyWebsite' className='block font-semibold'>
//               Company Website:
//             </label>
//             <input
//               type='url'
//               id='companyWebsite'
//               name='companyWebsite'
//               value={jobData.companyWebsite}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='phoneNumber' className='block font-semibold'>
//               Phone Number:
//             </label>
//             <input
//               type='number'
//               id='phoneNumber'
//               name='phoneNumber'
//               value={jobData.phoneNumber}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <label htmlFor='linkedInProfile' className='block font-semibold'>
//               LinkedIn Profile (Optional):
//             </label>
//             <input
//               type='url'
//               id='linkedInProfile'
//               name='linkedInProfile'
//               value={jobData.linkedInProfile}
//               onChange={handleInputChange}
//               className='w-full border-2 bg-gray-100 rounded-md py-2 px-3'
//             />
//           </div>
//           <div className='mb-4'>
//             <button
//               type='submit'
//               className='bg-purple-400 hover:bg-purple-500 active text-white font-semibold py-2 px-4 rounded-md'
//             >
//               Post Job
//             </button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PostJobs;
