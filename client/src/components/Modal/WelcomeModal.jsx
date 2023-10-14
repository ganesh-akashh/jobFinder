import React, { useEffect } from 'react';
import Confetti from 'react-confetti'; // Import the Confetti component
import GreetingImage from "../../assets/GreetingImage.jpg";
import { useDispatch } from "react-redux";
import { setModal } from '../../features/modal/modalSlice';

const WelcomeModal = () => {
    const dispatch = useDispatch();
    const [showConfetti, setShowConfetti] = React.useState(false);

    useEffect(() => {
        setShowConfetti(true);
        const confettiTimeout = setTimeout(() => {
            setShowConfetti(false);
        }, 3000); 
        return () => clearTimeout(confettiTimeout);
    }, []);

    return (
        <div className="bg-white p-8 text-center animate-fade animate-delay-75 animate-once rounded-lg shadow-md relative w-11/12 max-w-xl sm:w-10/12 md:w-8/12 lg:w-6/12">
            <div>
                <h2 className="font-bold mb-4 text-2xl sm:text-4xl">
                    Welcome to
                    <span className="text_gradient active ml-1 cursor-pointer"> JobFinder </span>
                </h2>
                <img
                    src={GreetingImage}
                    alt="Greeting"
                    className="w-full mb-4"
                />
                <p className="text-gray-500 text-sm sm:text-md text-center font-bold mb-4">
                    <span>Start your career journey with JobFinder!</span> Explore jobs, chat with us, and discover your dream job just a click away.
                </p>
            </div>

            {showConfetti && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 z-10">
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    </div>
                </div>
            )} 
            <div className="mb-3">
                <button
                    type='button'
                    onClick={() => dispatch(setModal({ modalName: 'jobStatusModal' }))}
                    className={`cursor-pointer w-full mt-1 bg-purple-400 hover:bg-purple-500 active text-white font-semibold px-4 py-2  rounded`}
                >
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default WelcomeModal;
