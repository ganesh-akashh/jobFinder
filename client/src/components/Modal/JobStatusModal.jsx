import React, { useState } from 'react';

const JobStatusModal = ({ }) => {
    const [jobStatus, setJobStatus] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [degreeType, setDegreeType] = useState('');
    const [desiredJobTitle, setDesiredJobTitle] = useState('');
    const [desiredJobLocation, setDesiredJobLocation] = useState('');

    const handleJobStatusChange = (e) => {
        setJobStatus(e.target.value);
    };



    const handleSubmit = (e) => {
        e.preventDefault();

    };

    const renderAdditionalFields = () => {
        if (jobStatus === 'employed') {
            return (
                <>
                    <div className="mb-3">
                        <label className="block text-gray-700 font-semibold mt-5 mb-2">Job Title*</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 font-semibold mb-2">Location*</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                </>
            );
        } else if (jobStatus === 'notEmployed') {
            return (
                <>
                    <div className="mb-3">
                        <label className="block text-gray-700 font-semibold mt-5 mb-2">Desired Job Title*</label>
                        <input
                            type="text"
                            value={desiredJobTitle}
                            onChange={(e) => setDesiredJobTitle(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 font-semibold mb-2">Desired Job Location*</label>
                        <input
                            type="text"
                            value={desiredJobLocation}
                            onChange={(e) => setDesiredJobLocation(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                </>
            );
        } else if (jobStatus === 'student') {
            return (
                <>

                    <div className="mb-3">
                        <label className="block text-gray-700 font-semibold mb-2">Degree Type*</label>
                        <input
                            type="text"
                            value={degreeType}
                            onChange={(e) => setDegreeType(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 font-semibold mb-2">Desired Job Title*</label>
                        <input
                            type="text"
                            value={desiredJobTitle}
                            onChange={(e) => setDesiredJobTitle(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 font-semibold mb-2">Desired Job Location*</label>
                        <input
                            type="text"
                            value={desiredJobLocation}
                            onChange={(e) => setDesiredJobLocation(e.target.value)}
                            className="w-full border text-gray-500 border-gray-300 p-2 font-semibold rounded"
                            required
                        />
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-8 animate-fade animate-delay-75 animate-once rounded-lg shadow-md relative w-11/12 max-w-lg sm:w-8/12 md:w-6/12 lg:w-4/12 max-h-[600px] overflow-y-auto  scrollbar-thin">
            <form onSubmit={handleSubmit}>
                <h2 className="font-bold mb-4 flex justify-center items-center text-3xl">
                    What's your job status?
                </h2>

                <div className="mb-3">
                    <label className="block text-gray-700 font-semibold mt-5 mb-5">Employment Status *</label>
                    <div className="flex flex-col gap-5 mb-4">
                        <label className="flex items-center mr-4 cursor-pointer">
                            <input
                                type="radio"
                                value="employed"
                                checked={jobStatus === 'employed'}
                                onChange={handleJobStatusChange}
                                className="mr-2 appearance-none cursor-pointer border-2 border-gray-500 rounded-full h-4 w-4 checked:border-purple-500  checked:border-4"
                            />
                            <span className="text-gray-700">Employed</span>
                        </label>
                        <label className="flex items-center mr-4 cursor-pointer">
                            <input
                                type="radio"
                                value="notEmployed"
                                checked={jobStatus === 'notEmployed'}
                                onChange={handleJobStatusChange}
                                className="mr-2 appearance-none cursor-pointer border-2 border-gray-500 rounded-full h-4 w-4 checked:border-purple-500  checked:border-4"
                            />
                            <span className="text-gray-700">Not Employed</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="student"
                                checked={jobStatus === 'student'}
                                onChange={handleJobStatusChange}
                                className="mr-2 appearance-none cursor-pointer border-2 border-gray-500 rounded-full h-4 w-4 checked:border-purple-500  checked:border-4"
                            />
                            <span className="text-gray-700">Student</span>
                        </label>
                    </div>

                    {renderAdditionalFields()}

                    <button
                        type="submit"
                        className="cursor-pointer mt-4 bg-purple-400 hover:bg-purple-500 active text-white font-semibold px-4 py-2 rounded w-full"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobStatusModal;
