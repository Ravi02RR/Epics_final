// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const Contact = ({ name }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/contact', formData);
            setSuccessMessage('Your message has been submitted successfully!');
            setFormData({ name: '', email: '', phoneNumber: '', message: '' });
        } catch (error) {
            setErrorMessage('An error occurred while submitting your message. Please try again later.');
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='max-w-lg w-full p-8 rounded-lg shadow-xl'>
                <h1 className='text-3xl font-semibold mb-6 text-center'>Contact Us, {name}</h1>
                {successMessage && <div className='bg-blue-100 text-blue-700 p-4 mb-4'>{successMessage}</div>}
                {errorMessage && <div className='bg-red-100 text-red-700 p-4 mb-4'>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
                        <input
                            className='input input-bordered w-full'
                            id='name'
                            type='text'
                            name='name'
                            placeholder={name}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                        <input
                            className='input input-bordered w-full'
                            id='email'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phoneNumber'>Phone Number</label>
                        <input
                            className='input input-bordered w-full'
                            id='phoneNumber'
                            type='text'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>Message</label>
                        <textarea
                            className='textarea textarea-bordered w-full'
                            id='message'
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='btn btn-primary' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
