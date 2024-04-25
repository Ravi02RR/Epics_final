// eslint-disable-next-line no-unused-vars
import React from 'react';
import Acct from '../../Component/Accordination/Acct';

const About = () => {
  return (
    <>
      <div id="about" className="relative bg-white overflow-hidden mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="50,0 100,0 50,100 0,100"></polygon>
            </svg>

            <div className="pt-1"></div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                  About LandOptimization
                </h2>

                <p>
                  Welcome to LandOptimization, your go-to platform for maximizing the potential of land resources through data-driven insights and predictive analytics. We are dedicated to helping you make informed decisions about land usage and business setup based on thorough analysis and cutting-edge technology.
                </p>
                <p className="mt-4">
                  At LandOptimization, we leverage machine learning models and advanced algorithms to analyze the survey data of specific areas and predict the most suitable business setup for optimal utilization of land resources. Whether you're a developer, investor, or entrepreneur, our platform provides valuable insights to guide your decisions and maximize profitability.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1591389703528-74fe74d4fb6f?q=80&w=2533&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </div>

      <div className='p-20 flex-row gap-5'>
      <Acct></Acct>

      </div>
      
    </>
  );
};

export default About;
