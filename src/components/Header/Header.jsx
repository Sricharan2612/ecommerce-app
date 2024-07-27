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
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';

const Header = () => {
    const { pathname } = useLocation();
    //States
    const [menuList, setMenuList] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    //Redux
    const { totalQuantity } = useSelector(data => data.cart);

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

    return (
        <header className='w-full h-[4rem] bg-white px-4 py-4 sticky top-0 left-0 z-40 shadow-xl'>
            <nav className='flex justify-between md:justify-around items-center h-full'>
                <div className="flex items-cente cursor-pointer text-[#071822]">
                    <img src={logo} alt="logo" className='w-[1.5rem]' />
                    <h1 className='text-xl font-bold ms-2 '>Multimart</h1>
                </div>
                <ul className="hidden md:flex items-center gap-12 text-[#071822]">
                    {navLinks.map((link, index) => (
                        <Link key={index} to={`${link.path}`}>
                            <li className='text-[1.1rem]' style={{ fontWeight: pathname === link.path ? '700' : '' }}>{link.name}</li>
                        </Link>
                    ))}
                </ul>
                <div className='flex items-center gap-4 sm:gap-8 text-[#071822]'>
                    <div className='relative cursor-pointer'>
                        <FaRegHeart fontSize={21} className='font-bold' />
                        <div className='w-[16px] h-[16px] flex items-center justify-center absolute top-[-5px] right-[-7px] text-sm font-semibold rounded-[50%] bg-blue-950 text-white'>0</div>
                    </div>
                    <div className='relative cursor-pointer'>
                        <RiShoppingBagLine fontSize={23} className='font-bold' />
                        <span className='w-[16px] h-[16px] flex items-center justify-center absolute top-[-5px] right-[-5px] text-sm font-semibold rounded-full bg-blue-950 text-white'>{totalQuantity}</span>
                    </div>
                    <div onClick={() => setMenuList(!menuList)} className='w-[2rem] cursor-pointer' >
                        <img src={userIcon} alt="userIcon" />
                        <div style={{ display: menuList ? 'block' : 'none' }}
                            className='absolute  top-16 right-16 md:right-28 lg:right-36 shadow-xl border  text-[16px] hidden bg-white'>
                            <ul>
                                <li className='px-10 py-2 hover:bg-[#D4E3FD]'>Sign Up</li>
                                <li className='px-10 py-2 hover:bg-[#D4E3FD]'>Log In</li>
                                <li className='px-10 py-2 hover:bg-[#D4E3FD]'>Dashboard</li>
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
                </ul>
            </div>
        </header >
    );
};

export default Header;
