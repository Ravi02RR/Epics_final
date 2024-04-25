import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestemonialForm = ({ user }) => {
  const [username, setUsername] = useState(user);
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/testimonials', {
        username,
        email,
        comment,
        rating,
      });
      console.log('Testimonial posted successfully:', response.data);
      toast.success('Testimonial posted successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error posting testimonial:', error);
      toast.error('Error posting testimonial');
    }
  };

  return (
    <div className="container mx-auto mt-8 h-screen">
      <h2 className="text-3xl font-bold mb-4">Post a Testimonial</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">(cannot be edited)*</span>
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            id="comment"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="rating rating-sm">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating"
                value={index + 1}
                onChange={() => setRating(index + 1)}
                className="mask mask-star-2 bg-orange-400"
                
              />
            ))}
          </div>
        </div>
        <button type="submit" className="py-2 px-4 rounded-md btn transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestemonialForm;
