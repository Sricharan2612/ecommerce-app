import React from 'react';
//Firebase
import useGetData from '../customHooks/useGetData';

const Orders = () => {
    const { data: orders, loading } = useGetData('orders');
    //Handlers
    const commaSeperatedPrice = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <section className='flex justify-center mt-12 mb-24 px-3 sm:px-0 h-auto lg:h-[60vh]'>
            <div className='w-[w-[100%] sm:w-[95%]'>
                <h2 className='text-[22px] font-bold text-center mb-10'>Orders</h2>
                {
                    loading
                        ? (
                            <div className='flex justify-center items-center my-32'>
                                <l-hourglass
                                    size="75"
                                    speed="1.75"
                                    color='#081B31'
                                ></l-hourglass>
                            </div>
                        )
                        : (
                            orders.length === 0
                                ? (
                                    <h2 className='text-xl  text-center font-semibold py-5'>No Orders exists!</h2>
                                )
                                : (
                                    <table className='w-[100%] table-fixed text-center text-[#071822] font-semibold rounded-lg border-separate border-spacing-0' >
                                        <thead className='bg-[#333] text-white'>
                                            <tr className='border-b border-[#071822]'>
                                                <th className='py-5 truncate ps-2'>Order Id</th>
                                                <th className=''>Name</th>
                                                <th className='truncate'>Address</th>
                                                <th>Date</th>
                                                <th className=''>Price</th>
                                                <th className=''>Items</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders?.map((order, index) => (
                                                <tr key={index} className='even:bg-[#eee]' >
                                                    <td className='truncate ps-2'>{order.id}</td>
                                                    <td className='text-sm sm:text-lg py-6 truncate'>{order.addressInfo.name}</td>
                                                    <td className='text-sm sm:text-lg truncate'> {`${order.addressInfo.address}, ${order.addressInfo.city}`}</td>
                                                    <td className='text-sm sm:text-lg truncate'> {order.date}</td>
                                                    <td className='text-sm sm:text-lg truncate'>₹{commaSeperatedPrice(order.totalAmount)}</td>
                                                    <td className='text-sm sm:text-lg'>{order.totalQuantity}</td>
                                                </ tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                )
                        )
                }
            </div >
        </section >
    );
};

export default Orders;
