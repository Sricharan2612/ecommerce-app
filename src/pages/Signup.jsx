import React, { useState } from 'react';
//Images
import signUp from '../assets/images/Signup.gif';
//React Router
import { Link, useNavigate } from 'react-router-dom';
//Firebase
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
//Firestore
import { db } from '../Firebase/firebase.config';
import { setDoc, doc } from 'firebase/firestore';
//Storage
import { storage } from '../Firebase/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

//React Toastify
import { toast } from 'react-toastify';
//Loader
import { quantum } from 'ldrs';


const Signup = () => {
    const navigate = useNavigate();
    //States
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    // console.log(file);

    //Handlers
    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const storageRef = ref(storage, `images/${userName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    toast.error(error.message);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    //Updating user profile with name and photoUrl
                    await updateProfile(user, { displayName: userName, photoURL: downloadURL });

                    //Storing the user data into the firestore
                    await setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: userName,
                        email,
                        photoURL: downloadURL,
                    });
                }
            );
            setLoading(false);
            toast.success('Account created');
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error("something went wrong");
        }
    };

    //Loader Initialization
    quantum.register();

    return (
        <div>
            {/* Sign Up Section */}
            {
                loading
                    ? (
                        <div className='flex justify-evenly  items-center h-[90vh]'>
                            <l-quantum
                                size="45"
                                speed="1.75"
                                color='#081B31'
                            ></l-quantum>
                        </div>
                    )
                    : (
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
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
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
                    )
            }
        </div>
    );
};

export default Signup;
