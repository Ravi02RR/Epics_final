// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import RatingStars from './RatingStars';


// eslint-disable-next-line react/prop-types
const Cardtest = ({ username, email, comment, time, onDelete, rating }) => {
    const verify = localStorage.getItem('email');

    const calculateTimeDiff = (timestamp) => {
        const currentTime = new Date();
        const commentTime = new Date(timestamp);
        const diffInMilliseconds = currentTime - commentTime;

        const seconds = Math.floor(diffInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        } else if (months > 0) {
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        } else if (days > 0) {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (hours > 0) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutes > 0) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
        }
    };

    const handleDelete = async () => {
        try {

            onDelete();
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
    };

    return (
        <div className=" rounded mockup-code  shadow-lg bg-gray-300 mb-4">
            <div className="px-6 py-4">
                <blockquote className="text-gray-600 italic md:text-3xl  sm:text-xl font-bold">&quot;{comment}&quot;</blockquote>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
                <div>
                    <p className="text-gray-900 leading-none ">{username}</p>
                    <p className="text-gray-600 "> <RatingStars rating={rating} /></p>
                    <p className="text-gray-600 ">{calculateTimeDiff(time)}</p>
                </div>
                {email === verify && (
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
                        onClick={handleDelete}
                    >
                        <FaTrashAlt />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cardtest;
