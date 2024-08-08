import React, { useState } from 'react';
//Images
import login from '../assets/images/login.gif';
//React Router
import { Link, useNavigate } from 'react-router-dom';
//Firebase
import { auth } from '../Firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
//Loader
import { quantum } from 'ldrs';





const Login = () => {
    const navigate = useNavigate();
    //States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    //Handlers
    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            setLoading(false);
            toast.success(`Welcome ${user.displayName}`);
            navigate('/home');

        } catch (error) {
            setLoading(false);
            toast.error(error.message.split('/')[1].split('-').join(' ').split(')')[0]);
        }

    };
    //Loader Initialization
    quantum.register();

    return (
        <div>
            {
                loading
                    ? (
                        <div className='flex justify-center  items-center h-[90vh]'>
                            <l-quantum
                                size="65"
                                speed="1.75"
                                color='#081B31'
                            ></l-quantum>
                        </div>
                    )
                    : (
                        <section className='flex justify-evenly  items-center gap-5 px-10 lg:px-20 my-10'>
                            <div className='md:w-auto xl:w-[40%] hidden md:block'>
                                <img src={login} alt="signUpImage" className='w-[100%]' />
                            </div>
                            <div className='shrink-0 w-full sm:w-[320px] lg:w-[380px] xl:w-[450px]  px-6 sm:px-10 pt-5 pb-10 sm:pt-12 sm:pb-16 rounded-md  shadow-[4px_4px_7px__1px#b1afaf,-4px_-4px_7px_#b1afaf] bg-[#081A36] text-white'>
                                <h2 className='text-3xl lg:text-4xl font-[600] mb-5 md:mb-8'>LogIn</h2>
                                <form action="" onSubmit={loginUser}>
                                    <div className='border border-[#b1afaf] rounded mb-3 text-[#081B31]'>
                                        <input
                                            type="email"
                                            placeholder='example@gmail.com'
                                            className='w-[100%] px-3 py-2 outline-none'
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='border border-[#b1afaf] rounded mb-6 text-[#081B31]'>
                                        <input
                                            type="password"
                                            placeholder='Password'
                                            className='w-[100%] px-3 py-2 outline-none'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button className='bg-white text-[#081B31] px-4 py-3 border-0 rounded cursor-pointer active:scale-[0.95] duration-100 w-[100%] font-[600]'>Log In</button>
                                </form>
                                <p className='text-sm mt-4 font-[400]'>
                                    Don't have an account?
                                    <Link to='/signup' className='hover:underline font-semibold'>
                                        <span className='ms-1'>SignUp</span>
                                    </Link>
                                </p>
                            </div>
                        </section>
                    )
            }
        </div >
    );
};

export default Login;
