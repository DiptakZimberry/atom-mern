import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { FaUser, FaThumbsUp, FaFacebookF, FaGoogle } from "react-icons/fa";
import { MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const queryClient = useQueryClient();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, username, fullName, password }) => {
            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, username, fullName, password }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to create account");
                setRegistrationSuccess(true);
                queryClient.invalidateQueries({ queryKey: ["authUser"] });
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // page won't reload
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFacebookLogin = () => {
        window.open("https://www.facebook.com/login", "_blank", "width=600,height=600");
    };

    const handleGoogleLogin = () => {
        window.open("https://accounts.google.com/signin", "_blank", "width=600,height=600");
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <XSvg className='lg:w-2/3 fill-white' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                {!registrationSuccess ? (
                    <>
                        <form className='lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
                            <XSvg className='w-24 lg:hidden fill-white' />
                            <h1 className='text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>JOIN ATOM TODAY!!</h1>
                            <label className='input input-bordered rounded flex items-center gap-2'>
                                <MdOutlineMail />
                                <input
                                    type='email'
                                    className='grow'
                                    placeholder='Email'
                                    name='email'
                                    onChange={handleInputChange}
                                    value={formData.email}
                                />
                            </label>
                            <div className='flex gap-4 flex-wrap'>
                                <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                                    <FaUser />
                                    <input
                                        type='text'
                                        className='grow'
                                        placeholder='Username'
                                        name='username'
                                        onChange={handleInputChange}
                                        value={formData.username}
                                    />
                                </label>
                                <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                                    <MdDriveFileRenameOutline />
                                    <input
                                        type='text'
                                        className='grow'
                                        placeholder='Full Name'
                                        name='fullName'
                                        onChange={handleInputChange}
                                        value={formData.fullName}
                                    />
                                </label>
                            </div>
                            <label className='input input-bordered rounded flex items-center gap-2'>
                                <MdPassword />
                                <input
                                    type='password'
                                    className='grow'
                                    placeholder='Password'
                                    name='password'
                                    onChange={handleInputChange}
                                    value={formData.password}
                                />
                            </label>
                            <button
                                className='relative btn rounded-full  bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  text-white bubble-out hover:bg-[#41B06E]  transition-transform transform hover:scale-105'
                                // style={{ backgroundColor: "#41B06E" }}
                            >
                                {isPending ? "Loading..." : "Sign up"}
                            </button>
                            {isError && <p className='text-red-500'>{error.message}</p>}
                        </form>
                        <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                            <p className='text-white text-lg'>Already have an account?</p>
                            <Link to='/login'>
                                <button 
                                    className='relative btn rounded-full text-white bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 w-full bubble-out hover:bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 transition-transform transform hover:scale-105'
                                     style={{ borderColor: "#41B06E", color: "white" }}
                                >
                                    Sign in
                                </button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className='flex flex-col items-center justify-center h-full'>
                        <p className='text-green-500 text-3xl font-bold mb-4'>Registration Successful!</p>
                        <div className='relative w-16 h-16 mb-4'>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <FaThumbsUp className='w-full h-full text-green-500 animate-pulse' />
                            </div>
                        </div>
                        <p className='text-white'>Your account has been created successfully.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;
