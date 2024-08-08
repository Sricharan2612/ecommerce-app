import React from 'react';
//customHooks
import useGetData from '../customHooks/useGetData';
//Icons
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";

const Dashboard = () => {
    const { data: products } = useGetData('products');
    const { data: users } = useGetData('users');
    const { data: orders } = useGetData('orders');

    return (
        <section className='my-20 px-6 h-auto sm:h-[60vh]'>
            <div className='flex justify-center gap-4 xl:gap-28 flex-wrap'>
                <div className='py-12 flex flex-col items-center justify-center w-[20rem] sm:w-[16rem] bg-[#D2E0F6] text-black rounded-lg shadow-xl'>
                    <RiMoneyRupeeCircleFill fontSize={55} className='block' />
                    <span className='font-[500] text-[1.3rem] mt-2'>₹10000</span>
                    <h4 className='font-[600] text-[1.4rem] md:text-[1.6rem]'>Total Sales</h4>
                </div>
                <div className='py-12 flex flex-col items-center justify-center w-[20rem] sm:w-[16rem] bg-[#D2E0F6] text-black rounded-lg shadow-xl'>
                    <GiCardboardBoxClosed fontSize={60} className='block' />
                    <span className='font-[500] text-[1.3rem] mt-2'>{orders.length}</span>
                    <h4 className='font-[600] text-[1.4rem] md:text-[1.6rem]'>Orders</h4>
                </div>
                <div className='py-12 flex flex-col items-center justify-center w-[20rem] sm:w-[16rem] bg-[#D2E0F6] text-black rounded-lg shadow-xl'>
                    <FaTruck fontSize={50} className='block' />
                    <span className='font-[500] text-[1.3rem] mt-2'>{products.length}</span>
                    <h4 className='font-[600] text-[1.4rem] md:text-[1.6rem]'>Total Products</h4>
                </div>
                <div className='py-12 flex flex-col items-center justify-center w-[20rem] sm:w-[16rem] bg-[#D2E0F6] text-black rounded-lg shadow-xl'>
                    <FaUser fontSize={50} className='block' />
                    <span className='font-[500] text-[1.3rem] mt-2'>{users.length}</span>
                    <h4 className='font-[600] text-[1.4rem] md:text-[1.6rem]'>Total Users</h4>
                </div>
            </div>
        </section >
    );
};

export default Dashboard;
