import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Emailvalidation from '@everapi/emailvalidation-js';

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const client = new Emailvalidation('ema_live_XSSQVOjLQrQIQNPAFGy5w4pfewjQ5nxQuErCH3ET');

    const handleChange = (e) => {
        const { name, value } = e.target;


        const containsNumberOrSymbol = name !== "email" && name !== "password" && /[0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(value);


        if (containsNumberOrSymbol) {
            e.preventDefault();
            return;
        }


        setError(containsNumberOrSymbol ? `${name} cannot contain numbers or symbols.` : "");


        setData({ ...data, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const isValidEmaill = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email);
            if (!isValidEmaill) {
                throw new Error("Invalid email address.");
            }
            const response = await client.info(data.email, {
                catch_all: 0
            });

            const isValidEmail = response.result === 'valid';
            if (!isValidEmail) {
                throw new Error("Invalid email address.");
            }

            const signupUrl = "https://epics-final-i5eq-git-main-ravi02rrs-projects.vercel.app/api/users";
            await axios.post(signupUrl, data);
            navigate("/login");


            toast.success("Signup successful!", {
                position: toast.POSITION.TOP_RIGHT
            });
        } catch (error) {
            setError(error.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div>
                        <h1 className="text-2xl font-bold mb-5">Create Account</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="input input-bordered flex items-center mt-3">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={data.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center mt-3">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={data.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center mt-3">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center mt-3">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <button type="submit" className="btn mt-5 w-full btn-primary" disabled={loading}>
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                        </form>
                        <label className="mt-4 mb-4">
                            <Link to="/login">Already have an account? Login</Link>
                        </label>
                        {error && <div className="text-red-500">{error}</div>}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
