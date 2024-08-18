import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import XSvg from "../../../components/svgs/X";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { FaFacebookF} from 'react-icons/fa';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaGoogle } from "react-icons/fa";
const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loginSuccess, setLoginSuccess] = useState(null); // Handle both success and failure
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (loginSuccess === true) {
            timer = setTimeout(() => {
                setLoginSuccess(null);
                navigate("/home"); // Redirect to home or desired page after the message disappears
            }, 10000); // Message stays for 10 seconds
        }
        return () => clearTimeout(timer);
    }, [loginSuccess, navigate]);

    const {
        mutate: loginMutation,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                setLoginSuccess(true);
            } catch (error) {
                setLoginSuccess(false);
                throw new Error(error.message || "Something went wrong");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen'>
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <XSvg className='lg:w-2/3 fill-white' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                {loginSuccess === null ? (
                    <>
                        <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                            <XSvg className='w-24 lg:hidden fill-white' />
                            <h1 className='text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-center'>{"WELCOME TO ATOM!!"}</h1>
                            <label className='input input-bordered rounded-full flex items-center gap-5'>
                                <MdOutlineMail />
                                <input
                                    type='text'
                                    className='grow'
                                    placeholder='Username'
                                    name='username'
                                    onChange={handleInputChange}
                                    value={formData.username}
                                />
                            </label>

                            <label className='input input-bordered rounded-full flex items-center gap-5'>
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
                                className='btn rounded-full text-white bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 border-[#41B06E] hover:bg-[#369a57] hover:border-[#369a57] transition-transform transform hover:scale-105'
                                title='Click to login'
                            >
                                {isPending ? "Loading..." : "Login"}
                            </button>
                            {isError && <p className='text-red-500'>{error.message}</p>}
                        </form>
                        <div className='flex flex-col gap-2 mt-4'>
                            <p className='text-white text-lg'>{"Don't"} have an account?</p>
                            <Link to='/signup'>
                                <button
                                    className='btn rounded-full text-white bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 hover:bg-[#41B06E] hover:text-white hover:border-[#41B06E] transition-transform transform hover:scale-105 w-full'
                                    title='Click to sign up'
                                >
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </>
                ) : loginSuccess ? (
                    <div className='flex flex-col items-center justify-center h-full'>
                        <p className='text-green-500 text-3xl font-bold mb-4'>Login Successful!</p>
                        <div className='relative w-16 h-16 mb-4'>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <svg className='w-full h-full text-green-500 animate-bounce' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L22 22H2L12 2Z" fill="currentColor" />
                                </svg>
                                <svg className='w-8 h-8 text-green-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <p className='text-white'>You are now logged in!</p>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-full'>
                        <p className='text-red-500 text-3xl font-bold mb-4'>Can't Login!</p>
                        <div className='relative w-16 h-16 mb-4'>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <svg className='w-full h-full text-red-500 animate-bounce' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L22 22H2L12 2Z" fill="currentColor" />
                                </svg>
                                <svg className='w-8 h-8 text-red-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <p className='text-white'>Please try again!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
