// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaStar } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const RatingStars = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<FaStar key={i} className="text-red-500" />);
        } else {
            stars.push(<FaStar key={i} className="text-white" />);
        }
    }
    return <div className="flex">{stars}</div>;
};

export default RatingStars;
