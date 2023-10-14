import React, { useState } from 'react';

const Review = () => {
    const [reviewText, setReviewText] = useState('');
 

    return (
        <div className="mb-4 max-w-md">
            <h3 className="text-xl font-bold mb-2">Add Reviews:</h3>
            <div className='flex flex-col'>
         
                <textarea
                    rows="5"
                    cols="50"
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className='border-gray-500 px-2 font-semibold py-2 border-2 mt-2'
                ></textarea>
                <button className="bg-purple-400 hover:bg-purple-500 active text-white px-4 py-2 mt-2" >
                    Add Review
                </button>
            </div>
        </div>
    );
};

export default Review;
