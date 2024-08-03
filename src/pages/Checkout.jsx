import React from 'react';
//Pages and Components
import CommonSection from '../UI/CommonSection';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const { totalQuantity, totalAmount } = useSelector(data => data.cart);
    //Handlers
    const commaSeperatedPrice = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div>
            <CommonSection title='Checkout' />
            <section className='my-10 px-5 sm:px-10 xl:px-20'>
                <div className=' flex flex-col md:flex-row justify-around gap-5'>
                    <div className='md:w-[60%]'>
                        <h6 className='font-bold text-lg mb-4'>Billing Information</h6>
                        <form action="">
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Enter your name'
                                    className='w-full px-3 py-2'
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="email"
                                    placeholder='Enter your email'
                                    className='w-full px-3 py-2'
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="number"
                                    placeholder='Phone number'
                                    className='w-full px-3 py-2'
                                />

                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Street address'
                                    className='w-full px-3 py-2'
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='City'
                                    className='w-full px-3 py-2'
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Postal code'
                                    className='w-full px-3 py-2'
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Country'
                                    className='w-full px-3 py-2'
                                />
                            </div>
                        </form>
                    </div>

                    <div className='md:w-[40%] lg:w-[30%]'>
                        <div className='bg-[#081A36] text-white p-[20px] mb-4 rounded'>
                            <h6 className='flex justify-between items-center mb-3'>
                                Total Qty:
                                <span>{totalQuantity}</span>
                            </h6>
                            <h6 className='flex justify-between items-center mb-3'>
                                Subtotal:
                                <span>₹{commaSeperatedPrice(totalAmount)}</span>
                            </h6>
                            <h6 className='flex justify-between items-center mb-4'>
                                <span>
                                    Shipping:
                                    <br />
                                    (Free shipping)
                                </span>
                                <span>₹0</span>
                            </h6>
                            <h4 className='flex justify-between items-center mb-7 text-lg sm:text-xl font-semibold border-t border-[#474959] pt-5'>
                                Total Cost:
                                <span className='font-[500]'>₹{commaSeperatedPrice(totalAmount)}</span>
                            </h4>
                            <button
                                className='bg-white text-[#081B31] px-4 py-2 border-0 rounded cursor-pointer active:scale-[0.95] duration-100 w-[100%] font-semibold'>
                                Place an order
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Checkout;
