import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
    




    // const validateEmailDomain = async () => {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://mailcheck.p.rapidapi.com/',
    //         params: {
    //             domain: 'mailinator.com'
    //         },
    //         headers: {
    //             'X-RapidAPI-Key': '3a764b944emsh1e977780c84d7d5p15868ajsn1efbc8a36042',
    //             'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
    //         }
    //     };

    //     try {
    //         const response = await axios.request(options);
    //         console.log(response.data);
    //         return response.data; 
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error('An error occurred while validating the email domain.');
    //     }
    // };









    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
           
            const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email);
            if (!isValidEmail) {
                throw new Error("Invalid email address.");
            }
    
            const signupUrl = "https://epics-final-i5eq-git-main-ravi02rrs-projects.vercel.app/api/users";
            const signupResponse = await axios.post(signupUrl, data);
            navigate("/login");
            console.log(signupResponse.data.message);
        } catch (error) {
            setError(error.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <>
            <div className="flex justify-center items-center h-screen ">
                <div className="card card-compact w-96 bg-base-100 shadow-xl">

                    <div className="card-body">
                        <div>
                            <h1 className="text-2xl font-bold mb-5">Create Account</h1>
                            <form onSubmit={handleSubmit}>
                                <label className="input input-bordered flex items-center mt-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
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
                                <Link to="/login" >Already have an account? Login</Link>
                            </label>
                            {error && <div className="text-red-500">{error}</div>}
                        </div>

                    </div>
                </div>
            </div>


        </>

    );
};

export default Signup;
