import React, { useState } from 'react';
//Images
import signUp from '../assets/images/Signup.gif';
//React Router
import { Link } from 'react-router-dom';
//Firebase
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Signup = () => {
    //States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    // console.log(file);

    //Handlers
    const registerUser = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, { displayName: name });
                console.log(user);
            });
    };
    return (
        <div>
            {/* Sign Up Section */}
            <section className='flex justify-evenly  items-center gap-5 px-10 lg:px-20 h-[90vh]'>
                <div className='w-auto md:block'>
                    <img src={signUp} alt="signUpImage" className='w-[100%] object-cover' />
                </div>
                <div className='shrink-0 w-full sm:w-[320px] lg:w-[380px] xl:w-[450px]  px-6 sm:px-10 pt-8 pb-8 lg:pt-12 lg:pb-16 rounded-md  shadow-[2px_2px_5px__1px#b1afaf,-2px_2px_10px_#b1afaf] bg-[#081A36] text-white'>
                    <h2 className='text-3xl lg:text-4xl font-[600] mb-5 md:mb-8'>Sign Up</h2>
                    <form action="" onSubmit={registerUser}>
                        <div className='border border-[#b1afaf] rounded mb-3 text-[#081B31]'>
                            <input
                                type="text"
                                placeholder='Enter your name'
                                className='w-[100%] px-3 py-2 outline-none '
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='border border-[#b1afaf] rounded mb-3 text-[#081B31]'>
                            <input
                                type="email"
                                placeholder='Example@gmail.com'
                                className='w-[100%] px-3 py-2 outline-none'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='border border-[#b1afaf] rounded mb-3 text-[#081B31]'>
                            <input
                                type="password"
                                placeholder='Password'
                                className='w-[100%] px-3 py-2 outline-none'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className=' rounded mb-8'>
                            <input
                                type="file"
                                className='w-[100%] py-2 outline-none cursor-pointer'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>

                        <button className='bg-white text-[#081B31] px-4 py-3 border-0 rounded cursor-pointer active:scale-[0.95] duration-100 w-[100%] font-[600]'>Sign Up</button>
                    </form>
                    <p className='text-sm mt-4 font-[400]'>
                        Already a existing user?
                        <Link to='/login' className='hover:underline font-semibold'>
                            <span className='ms-1'>LogIn</span>
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Signup;
