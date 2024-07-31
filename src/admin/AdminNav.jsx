import React, { useState } from 'react';
//Images
import logo from '../assets/images/eco-logo.png';
import userIcon from '../assets/images/user-icon.png';

//React Router
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//customHooks
import useAuth from '../customHooks/useAuth';
//Firebase
import { auth } from '../Firebase/firebase.config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';


const AdminNav = () => {
    const { pathname } = useLocation();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    //States
    const [menuList, setMenuList] = useState(false);

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

    //Admin Nav Links
    const adminNavLinks = [
        {
            name: 'Dashboard',
            path: '/dashboard'
        },
        {
            name: 'Products',
            path: '/dashboard/all-products'
        },
        {
            name: 'Add Product',
            path: '/dashboard/add-product'
        },
        {
            name: 'Orders',
            path: '/dashboard/orders'
        },
        {
            name: 'Users',
            path: '/dashboard/users'
        },
    ];

    return (
        <>
            <header className='w-full h-[5rem] bg-[#091C33] px-4 py-4 sticky top-0 left-0 z-40' >
                <nav className='flex justify-between md:justify-evenly items-center  h-full'>
                    {/* Nav Logo */}
                    <div className="flex items-center cursor-pointer text-white">
                        <h1 className='text-xl font-bold ms-2 '>Multimart</h1>
                    </div>
                    {/* Search Bar */}
                    <div className='hidden sm:flex sm:w-[40%] lg:w-[50%] rounded-md overflow-hidden bg-white text-[#071832]'>
                        <input type="text" placeholder='Search...' className='w-[100%] py-2 px-3 outline-none' />
                        <i className="ri-search-line text-lg px-4 flex justify-center items-center cursor-pointer"></i>
                    </div>
                    {/* Nav Buttons */}
                    <div className='flex items-center gap-4 sm:gap-8 text-white'>
                        <div className='relative cursor-pointer active:scale-[1.1] duration-75'>
                            <i className="ri-notification-2-line text-[21px]"></i>
                        </div>
                        <div className='relative cursor-pointer active:scale-[1.1] duration-75'>
                            <Link to=''>
                                <i className="ri-settings-3-line text-[22px]"></i>
                            </Link>
                        </div>
                        <div onClick={() => setMenuList(!menuList)} className='w-[2rem] cursor-pointer' >
                            <div className='flex items-center lg:w-[100px]  gap-1'>
                                <div className='bg-transparent flex justify-center items-center  active:scale-[1.1] duration-75  overflow-hidden'>
                                    <img src={currentUser ? currentUser.photoURL : userIcon} alt="userProfileIcon" className='w-[40px] h-[40px] object-center rounded-full' />
                                </div>
                                <p className=' hidden lg:block font-[500] text-md lg:text-lg ms-1'>{currentUser?.displayName}
                                </p>
                            </div>
                            <div style={{ display: menuList ? 'block' : 'none', }}
                                className='absolute  top-20 right-16 md:right-28 lg:right-36 shadow-xl border  text-[16px] hidden bg-white text-[#071832]'>
                                <ul>
                                    {
                                        currentUser && (
                                            <>
                                                <li onClick={logoutUser} className='px-10 py-2 hover:bg-[#D4E3FD]'>Sign out</li>
                                                <Link to='/dashboard'>
                                                    <li className='px-10 py-2 hover:bg-[#D4E3FD]'>Dashboard</li>
                                                </Link>
                                            </>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* <RiMenuFill onClick={() => setMenuToggle(true)} fontSize={21} className='sm:hidden cursor-pointer' /> */}
                    </div>
                </nav>
            </header >
            <section className='w-full h-fit sm:h-[4rem] bg-[#D2E0F6] pt-3 pb-4 sm:py-0 px-1'>
                <div className='flex justify-center items-center h-full'>
                    <ul className='flex justify-center text-md lg:text-lg gap-3 sm:gap-6 md:gap-16 lg:gap-20 text-[#071832] font-[500] flex-wrap'>
                        {
                            adminNavLinks.map((link, index) => (
                                <Link to={`${link.path}`} key={index} >
                                    <li
                                        className='py-2 px-3 rounded min-w-fit'
                                        style={{
                                            backgroundColor: link.path === pathname ? 'white' : '',
                                            fontWeight: link.path === pathname ? '700' : ''
                                        }}>
                                        {link.name}
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
            </section >
        </>
    );
};

export default AdminNav;
