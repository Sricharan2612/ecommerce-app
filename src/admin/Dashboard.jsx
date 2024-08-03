import React from 'react';
//customHooks
import useGetData from '../customHooks/useGetData';

const Dashboard = () => {
    const { data: products } = useGetData('products');
    const { data: users } = useGetData('users');
    return (
        <section className='my-20 px-6'>
            <div className='flex justify-center gap-4 xl:gap-28 flex-wrap'>
                <div className='py-12 text-center w-[20rem] sm:w-[16rem] bg-teal-300 rounded-lg shadow-xl'>
                    <h4 className='font-[500] text-lg'>Total Sales</h4>
                    <span className='font-[600] text-[2rem]'>₹10000</span>
                </div>
                <div className='py-12 text-center w-[20rem] sm:w-[16rem] bg-teal-300 rounded-lg shadow-xl'>
                    <h4 className='font-[500] text-lg'>Orders</h4>
                    <span className='font-[600] text-[2rem]'>789</span>
                </div>
                <div className='py-12 text-center w-[20rem] sm:w-[16rem] bg-teal-300 rounded-lg shadow-xl'>
                    <h4 className='font-[500] text-lg'>Total Products</h4>
                    <span className='font-[600] text-[2rem]'>{products.length}</span>
                </div>
                <div className='py-12 text-center w-[20rem] sm:w-[16rem] bg-teal-300 rounded-lg shadow-xl'>
                    <h4 className='font-[500] text-lg'>Total Users</h4>
                    <span className='font-[600] text-[2rem]'>{users.length}</span>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
