import React from 'react';
import logo from '../../assets/images/eco-logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className='bg-[#071832] text-white'>
            <div className='flex flex-col items-center md:flex-row justify-evenly gap-4 md:items-start px-10 py-8 '>
                <div className=' md:w-[25%] flex flex-col items-center md:items-start '>
                    <div className=" cursor-pointer mb-2 ">
                        <h1 className='text-xl font-bold '>Multimart</h1>
                    </div>
                    <p className='leading-[30px] text-[rgba(255,255,255,0.735)] text-center  md:text-left'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, doloremque. </p>
                </div>
                <div className=' w-fit text-center md:text-left'>
                    <h4 className='font-bold text-xl mb-2'>Top Categories</h4>
                    <ul className='text-[rgba(255,255,255,0.735)]'>
                        <Link to='#'>
                            <li className='mb-1'>Mobile Phones</li>
                        </Link>
                        <Link to='#'>
                            <li className='mb-1'>Modern Sofa</li>
                        </Link>
                        <Link to='#'>
                            <li className='mb-1'>Arm Chair</li>
                        </Link>
                        <Link to='#'>
                            <li>Smart Watches</li>
                        </Link>
                    </ul>
                </div>
                <div className='w-fit text-center md:text-left'>
                    <h4 className='font-bold text-xl mb-2'>Useful Links</h4>
                    <ul className='text-[rgba(255,255,255,0.735)]'>
                        <Link to='/shop'>
                            <li className='mb-1'>Shop</li>
                        </Link>
                        <Link to='/cart'>
                            <li className='mb-1'>Cart</li>
                        </Link>
                        <Link to='/login'>
                            <li className='mb-1'>Login</li>
                        </Link>
                        <Link to='#'>
                            <li>Privacy policy</li>
                        </Link>
                    </ul>
                </div>
                <div className='w-[250px] text-center md:text-left'>
                    <h4 className='font-bold text-xl mb-2'>Contact</h4>
                    <div className='flex items-center justify-center md:justify-start text-[rgba(255,255,255,0.735)] mb-1'>
                        <span><i className="ri-map-pin-line"></i></span>
                        <p className='ms-2'>123, Modern City, Odisha</p>
                    </div>
                    <div className='flex items-center justify-center md:justify-start text-[rgba(255,255,255,0.735)] mb-1'>
                        <span><i className="ri-phone-line"></i></span>
                        <p className='ms-2'>+91-9204993901</p>
                    </div>
                    <div className='flex items-center justify-center md:justify-start text-[rgba(255,255,255,0.735)]'>
                        <span><i className="ri-mail-line"></i></span>
                        <p className='ms-2'>example@gmail.com</p>
                    </div>
                </div>
            </div>
            <hr className='border-1 border-[#afaaaa8c] mx-10' />
            <div className='text-center py-3 text-[rgba(255,255,255,0.735)]'>
                <p>&copy; Copyright {year} developed by Sricharan. </p>
                <p> All rights reserved</p>
            </div>
        </div >
    );
};

export default Footer;
