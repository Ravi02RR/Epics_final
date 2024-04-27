// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from "react-scroll";
import { Typewriter } from 'react-simple-typewriter';
import ChatBot from '../../Component/Chatbot/ChatBot';

const HomeComponent = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1713815540178-8322b898a2c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8)" }}>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>

            <main className="px-4 sm:px-6 lg:px-8 z-10">
                <div className="text-center">
                    <h2 className="text-3xl tracking-tight leading-10 font-medium sm:text-2xl text-white sm:leading-none md:text-4xl">
                        <span className="mb-8"> <span className="text-yellow-600 font-bold ">LandOpti</span> - Your Land Optimization Solution!</span>
                        <br />
                        <span className="text-white">Unlock the potential of your land with</span>
                        <br />
                        <Typewriter delaySpeed={800} loop={0} typeSpeed={100} words={["AI-driven", "ML-based", "Predictive"]} />
                        <br />
                        <span className="text-white">business setup predictions!</span>
                    </h2>


                    <div className="mt-5 sm:mt-8 sm:flex justify-center">
                        <div className="rounded-md shadow">
                            <Link activeClass="active"
                                spy={true}
                                smooth={true}
                                duration={500} to="sec2" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:border-yellow-700 focus:shadow-outline-yellow transition duration-150 ease-in-out md:py-4 md:px-10">Explore</Link>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button onClick={() => document.getElementById('my_modal_4').showModal()} className="  w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-yellow-700 bg-yellow-100 hover:text-yellow-600 hover:bg-yellow-50 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-300 transition duration-150 ease-in-out md:py-4 md:px-10">
                                Talk to LandOpti !
                            </button>
                        </div>
                    </div>
                </div>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">LandOpti Chat Bot</h3>
                        <ChatBot />
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </main>
        </div>
    );
}

export default HomeComponent;

