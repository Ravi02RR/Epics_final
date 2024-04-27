// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Cardtest from '../../Component/Testmonial/Cardtest';
import axios from 'axios';

const HomeComponent3 = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('https://epics-final-i5eq-git-main-ravi02rrs-projects.vercel.app/api/testimonials');
                setTestimonials(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://epics-final-i5eq-git-main-ravi02rrs-projects.vercel.app/api/testimonials/${id}`);
            setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
    };

    return (
        <>
           <div className='flex justify-center items-center '>
           <div className='md:p-10'>
                <div className='bg-gray-100 overflow-hidden' id='sec2'>
                    <div className="py-12">
                        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-semibold text-gray-900">Customer Testimonials</h2>
                                <p className="mt-2 text-lg text-gray-500">See what our customers are saying about us</p>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-auto px-4 sm:px-6 lg:px-8 mt-8 overflow-y-auto max-h-screen ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {testimonials.map((testimonial, index) => (
                                <Cardtest

                                    key={index}
                                    username={testimonial.username}
                                    email={testimonial.email}
                                    comment={testimonial.comment}
                                    time={testimonial.time}
                                    onDelete={() => handleDelete(testimonial._id)}
                                    rating={testimonial.rating}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </>
    );
}

export default HomeComponent3;
