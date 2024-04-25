// eslint-disable-next-line no-unused-vars
import React from 'react';

const Acct = () => {
    return (
        <>
            <div className="collapse collapse-plus bg-base-200 mb-4">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    Land Optimization Services
                </div>
                <div className="collapse-content">
                    <p>Explore our comprehensive range of land optimization services tailored to meet the diverse needs of developers, investors, and businesses. From land surveying to predictive analytics, we provide the tools and insights you need to maximize the potential of your land resources.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 mb-4">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Business Setup Predictions
                </div>
                <div className="collapse-content">
                    <p>Unlock the power of predictive analytics to determine the best business setup for your land. Our machine learning models analyze survey data and market trends to forecast the most profitable business ventures for your specific location, helping you make informed decisions and optimize your returns.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 mt-4">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Expert Consultation
                </div>
                <div className="collapse-content">
                    <p>Get personalized expert consultation from our team of land optimization specialists. Whether you're planning a new development project or seeking advice on land utilization strategies, we're here to provide tailored solutions and guidance to ensure your success.</p>
                </div>
            </div>
        </>
    );
};

export default Acct;
