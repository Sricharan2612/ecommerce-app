import React, { useState } from 'react';
//Images
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
//Icons
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { RiMenuFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
//React Router
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
//customHooks
import useAuth from '../../customHooks/useAuth';
//Firebase
import { auth } from '../../Firebase/firebase.config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Header = () => {
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    const { pathname } = useLocation();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    //States
    const [menuList, setMenuList] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    //Redux
    const { totalQuantity } = useSelector(data => data.cart);
    //Handlers
    const logoutUser = async () => {
        signOut(auth)
            .then(() => {
                toast.success("Logged out ");
                navigate('/home');
            })
            .catch((error) => {
                toast.error(error.message);
            });

    };

    const navLinks = [
        {
            name: 'Home',
            path: '/home'
        },
        {
            name: 'Shop',
            path: '/shop'
        },
        {
            name: 'Cart',
            path: '/cart'
        },
    ];

    console.log(adminEmail);

    return (
        <header className='w-full h-[4.5rem] bg-white px-4 py-4 sticky top-0 left-0 z-40 shadow-xl'>
            <nav className='flex justify-between md:justify-around items-center h-full '>
                {/* Nav Logo */}
                <Link to='/'>
                    <div className="flex items-center cursor-pointer text-[#071822]">
                        <img src={logo} alt="logo" className='w-[1.5rem]' />
                        <h1 className='text-xl font-bold ms-2 '>Multimart</h1>
                    </div>
                </Link>
                {/* Nav Links */}
                <ul className="hidden md:flex items-center gap-12 text-[#071822]">
                    {navLinks.map((link, index) => (
                        <Link key={index} to={`${link.path}`}>
                            <li className='text-[1.1rem]' style={{ fontWeight: pathname === link.path ? '700' : '' }}>{link.name}</li>
                        </Link>
                    ))}
                    {currentUser?.email === process.env.REACT_APP_ADMIN_EMAIL
                        ? (
                            <Link to='/dashboard'>
                                <li className='bg-[#081B31] text-white px-3 py-2 rounded-md font-[500] active:scale-[0.9] duration-100 cursor-pointer'>Admin</li>
                            </Link>
                        )
                        : ''
                    }
                </ul>
                {/* Nav Buttons */}
                <div className='flex items-center gap-4 sm:gap-8 text-[#071822]'>
                    <div className='relative cursor-pointer active:scale-[1.1] duration-75'>
                        <FaRegHeart fontSize={21} className='font-bold' />
                        <div className='w-[16px] h-[16px] flex items-center justify-center absolute top-[-5px] right-[-7px] text-sm font-semibold rounded-[50%] bg-blue-950 text-white'>0</div>
                    </div>
                    <div className='relative cursor-pointer active:scale-[1.1] duration-75'>
                        <Link to='/cart'>
                            <RiShoppingBagLine fontSize={23} className='font-bold' />
                        </Link>
                        <span className='w-[16px] h-[16px] flex items-center justify-center absolute top-[-5px] right-[-5px] text-sm font-semibold rounded-full bg-blue-950 text-white'>
                            {totalQuantity}
                        </span>
                    </div>
                    <div onClick={() => setMenuList(!menuList)} className='w-[2rem] cursor-pointer' >
                        <div className='flex items-center w-[100px] gap-1'>
                            <div className='bg-transparent flex justify-center items-center  active:scale-[1.1] duration-75  overflow-hidden rounded-full'>
                                <img src={currentUser ? currentUser.photoURL : userIcon} alt="userProfileIcon" className='w-[40px] h-[40px] object-center rounded-full aspect-[3/3] ' />
                            </div>
                            {/* <p style={{ display: currentUser ? 'block' : 'none' }}
                                className=' hidden sm:block font-[500] text-md md:text-lg'>{currentUser?.displayName}</p> */}
                        </div>
                        <div style={{ display: menuList ? 'block' : 'none', }}
                            className='absolute  top-16 right-16 md:right-28 lg:right-36 shadow-xl border  text-[16px] hidden bg-white'>
                            <ul>
                                {
                                    currentUser
                                        ? (
                                            <>
                                                <li onClick={logoutUser} className='px-10 py-3 hover:bg-[#D4E3FD] text-lg'>Sign out</li>
                                            </>
                                        )
                                        : (
                                            <>
                                                <Link to='/signup'>
                                                    <li className='px-10 py-3 hover:bg-[#D4E3FD] text-lg'>Sign Up</li>
                                                </Link>
                                                <Link to='/login'>
                                                    <li className='px-10 py-3 hover:bg-[#D4E3FD] text-lg'>Log In</li>
                                                </Link>
                                            </>
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                    <RiMenuFill onClick={() => setMenuToggle(true)} fontSize={21} className='sm:hidden cursor-pointer' />
                </div>
            </nav>
            <div className='w-[60%] h-[100vh] bg-[#09172E] text-white absolute top-0 right-0 py-4 px-4 translate-x-[100%] duration-300 '
                style={{
                    transform: menuToggle ? "translateX(0%)" : '',
                    // display: menuToggle ? 'block' : ''
                    opacity: menuToggle ? '1' : '0',
                }}>
                <div className='flex justify-end'>
                    <IoCloseSharp className='cursor-pointer' onClick={() => setMenuToggle(false)} fontSize={25} />
                </div>
                <ul className='flex flex-col items-center mt-32 gap-10 justify-center text-xl'>
                    {navLinks.map((link, index) => (
                        <Link key={index} to={`${link.path}`}>
                            <li onClick={() => setMenuToggle(false)} className=' cursor-pointer font-light'
                                style={{ fontWeight: pathname === link.path ? '700' : '' }} >
                                {link.name}
                            </li>
                        </Link>
                    ))}
                    {currentUser?.email === process.env.REACT_APP_ADMIN_EMAIL
                        ? (
                            <Link to='/dashboard'>
                                <li className='rounded-md font-[500] active:scale-[0.9] duration-100 cursor-pointer'>Admin</li>
                            </Link>
                        )
                        : ''
                    }
                </ul>
            </div>
        </header >
    );
};

export default Header;
