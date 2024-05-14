// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import ColorSwitch from '../ColorSwitch.jsx';
import { FaSignOutAlt } from 'react-icons/fa'
import Tooltip from '../Tooltip.jsx';

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("token");


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = '/';
    };

    return (
        <div className="drawer drawer-end shadow-black">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-base-300 flex items-center justify-between px-4 py-2">
                    <div className="flex items-center">
                        <div className="lg:hidden mr-4">
                            <label className="btn btn-circle swap swap-rotate" htmlFor="my-drawer-3" aria-label="open sidebar">
                            
                                <input type="checkbox" />
                                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                            </label>
                        </div>
                        <Link to={'/'}>

                            <span className="text-yellow-600 font-bold  text-3xl  sm:text-xl">LandOpti</span>
                            {/* <img src={'https://imgs.search.brave.com/TFAuK01WmOKAMcq73Q-ReKsTL4cT8PIaEq-e4kdNFrk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly92aXQu/YWMuaW4vTUFHWDE5/L2ltYWdlcy92aXRs/b2dvbWFpbi5wbmc'} alt="Logo" style={{ width: '100px', height: 'auto' }} /> */}
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center">
                        <ul className="menu menu-horizontal flex">
                            <li><Link to={"/"} className="text-lg font-semibold mx-4">Home</Link></li>
                            <li><Link to={"/About"} className="text-lg font-semibold mx-4">About</Link></li>
                            <li><Link to={"/Contact"} className="text-lg font-semibold mx-4">Contact</Link></li>
                            
                            {isLoggedIn && (
                                <>
                                    <li><Link to={"/post"} className="text-lg font-semibold mx-4">Post</Link></li>
                                    <li><Link to={"/search"} className="text-lg font-semibold mx-4">Search</Link></li>
                                    <li><Link to={"/testmonial"} className="text-lg font-semibold mx-4">Feedback</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className='flex gap-4'>
                        <ColorSwitch />
                        <Tooltip></Tooltip>
                        {isLoggedIn && (
                            <button className="btn " onClick={handleLogout}>
                                <FaSignOutAlt />Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="drawer-side z-50  mt-16 ">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80  min-h-screen bg-base-200 ">
                    <li><Link to={"/"} className="text-lg font-semibold">Home</Link></li>
                    <li><Link to={"/About"} className="text-lg font-semibold">About</Link></li>
                    <li><Link to={"/Contact"} className="text-lg font-semibold">Contact</Link></li>
                    

                    {isLoggedIn && (
                        <>
                            <li><Link to={"/post"} className="text-lg font-semibold mx-4">Post</Link></li>
                            <li><Link to={"/search"} className="text-lg font-semibold mx-4">Search</Link></li>
                            <li><Link to={"/testmonial"} className="text-lg font-semibold mx-4">Feedback</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
