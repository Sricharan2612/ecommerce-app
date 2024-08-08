import React, { useState } from 'react';
//Pages and Components
import CommonSection from '../UI/CommonSection';
//Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/slices/cartSlice';
//Firebase
import { db } from '../Firebase/firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import useAuth from '../customHooks/useAuth';
//React Router
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
    const navigate = useNavigate();
    const { totalQuantity, totalAmount, cartItems } = useSelector(data => data.cart);
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    console.log(cartItems);
    //States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState(null);
    const [country, setCountry] = useState('');
    //Handlers
    const commaSeperatedPrice = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const addressInfo = {
            name,
            email,
            contact,
            address,
            city,
            postalCode,
            country
        };

        var options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
            amount: totalAmount * 100,
            currency: "INR",
            order_receipt: 'order_rcptid_' + name,
            name: "Multimart",
            description: "for testing purpose",
            handler: async function (response) {

                toast.success('Payment Successful');

                const paymentId = response.razorpay_payment_id;
                // store in firebase 
                const orderInfo = {
                    cartItems,
                    addressInfo,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    totalAmount,
                    totalQuantity,
                    email: currentUser.email,
                    userid: currentUser.uid,
                    paymentId
                };

                try {
                    const ordersRef = collection(db, "orders");
                    await addDoc(ordersRef, orderInfo);
                    dispatch(cartActions.clearCart());
                    toast.success('Order received successfully');
                    navigate('/');

                } catch (error) {
                    toast.error(error.message.split('/')[1].split('-').join(' ').split(')')[0]);
                }
            },
            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
        console.log(pay);
    };

    return (
        <div>
            <CommonSection title='Checkout' />
            <section className='my-10 px-5 sm:px-10 xl:px-20'>
                <div className=' flex flex-col md:flex-row justify-around gap-5'>
                    {/* Checkout form */}
                    <div className='md:w-[60%]'>
                        <h6 className='font-bold text-lg mb-4'>Billing Information</h6>
                        <form action="">
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Enter your name'
                                    className='w-full px-3 py-2'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="email"
                                    placeholder='Enter your email'
                                    className='w-full px-3 py-2'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="number"
                                    placeholder='Phone number'
                                    className='w-full px-3 py-2'
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />

                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Street address'
                                    className='w-full px-3 py-2'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='City'
                                    className='w-full px-3 py-2'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Postal code'
                                    className='w-full px-3 py-2'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='border border-[#b1afaf] w-[100%] rounded mb-3'>
                                <input
                                    type="text"
                                    placeholder='Country'
                                    className='w-full px-3 py-2'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    {/* Purchase summary */}
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
                                onClick={handleSubmit}
                                type='submit'
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
