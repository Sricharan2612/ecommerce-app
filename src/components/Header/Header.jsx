import React, { useState } from 'react';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { RiMenuFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const { pathname } = useLocation();
    const [menuList, setMenuList] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
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
        <header className='w-full h-[4rem] px-4 py-4'>
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
                <div className='flex items-center gap-8 text-[#071822]'>
                    <div className='relative cursor-pointer'>
                        <FaRegHeart fontSize={21} className='font-bold' />
                        <div className='w-[16px] h-[16px] flex items-center justify-center absolute top-[-5px] right-[-7px] text-md font-bold rounded-[50%] bg-blue-950 text-white'>0</div>
                    </div>
                    <div className='relative cursor-pointer'>
                        <RiShoppingBagLine fontSize={23} className='font-bold' />
                        <span className='w-[16px] h-[16px] flex items-center justify-center absolute top-[-5px] right-[-5px] text-md font-bold rounded-full bg-blue-950 text-white'>0</span>
                    </div>
                    <div onClick={() => setMenuList(!menuList)} className='w-[2rem] cursor-pointer' >
                        <img src={userIcon} alt="userIcon" />
                        <div style={{ display: menuList ? 'block' : 'none' }}
                            className='absolute top-16 right-28 shadow-xl border px-10 py-3 text-[18px] hidden bg-white'>
                            <a href="">Logout</a>
                        </div>
                    </div>
                    <RiMenuFill onClick={() => setMenuToggle(true)} fontSize={21} className='sm:hidden cursor-pointer' />
                </div>
            </nav>
            <div
                className='w-[50%] h-[100vh] bg-slate-400 absolute top-0 right-0 py-4 px-3 translate-x-[100%] duration-500 hidden'
                style={{
                    transform: menuToggle ? "translateX(0%)" : '',
                    display: menuToggle ? 'block' : ''
                }}
            >
                <div className='flex justify-end'>
                    <IoCloseSharp onClick={() => setMenuToggle(false)} fontSize={25} />
                </div>
                <ul className='flex flex-col items-center mt-32 gap-10 justify-center text-xl'>
                    {navLinks.map((link, index) => (
                        <Link key={index} to={`${link.path}`}>
                            <li className='hover:text-[#071822] cursor-pointer'
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
