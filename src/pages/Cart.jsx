import React from 'react';
import CommonSection from '../UI/CommonSection';
import tdImg from '../assets/images/arm-chair-01.jpg';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../Redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, totalAmount } = useSelector(data => data.cart);

    return (
        <div>
            <CommonSection title='Cart' />
            {/* Cart  */}
            <section className='py-12 px-5 md:px-7 lg:px-20 flex flex-col md:flex-row justify-center gap-16 md:gap-5 lg:gap-12 '>
                {/* Cart Items Part */}
                <div className='md:w-[85%] lg:w-[70%]'>
                    {
                        cartItems.length === 0
                            ? (
                                <h2 className='text-xl text-center font-semibold'>No items in the cart!</h2>
                            )
                            : (
                                <table className='w-[100%]  table-fixed text-center text-[#071822] font-semibold' >
                                    <thead >
                                        <tr className='border-b border-[#071822]'>
                                            <th className='w-[25%] sm:w-[10%]'>Image</th>
                                            <th className='w-[30%] sm:w-auto'>Title</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <Tr item={item} key={index} />
                                        ))}
                                    </tbody>
                                </table>
                            )
                    }
                </div>
                {/* SubTotal part */}
                <div className='text-[#071822]'>
                    <div>
                        <h6 className='text-2xl font-semibold flex items-center justify-between'>
                            Subtotal:
                            <span className='text-2xl font-bold'>
                                ₹{totalAmount}
                            </span>
                        </h6>
                    </div>
                    <p className='mt-2 pe-3 text-md'>taxes and shipping will calculate in checkout</p>
                    <div className='mt-6 flex flex-col justify-center items-center gap-3 '>
                        <Link to='/checkout' className='w-[100%]'>
                            <button
                                className='bg-[#081B31] text-white px-4 py-3 border-0 rounded cursor-pointer active:scale-[0.95] duration-100 w-[100%] font-semibold'>
                                Checkout
                            </button>
                        </Link>
                        <Link to='/shop' className='w-[100%]'>
                            <button
                                className='bg-[#081B31] text-white px-4 py-3 border-0 rounded cursor-pointer active:scale-[0.95] duration-100 w-[100%] font-semibold'>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </section >
        </div >
    );
};

const Tr = ({ item }) => {
    const dispatch = useDispatch();
    //Handlers
    const removeFromCart = (id) => {
        dispatch(cartActions.deleteItem(id));
        toast.success("Item deleted sucessfully");
    };
    return (
        <tr className='border-b border-[#071822]'>
            <td ><img src={item.image} alt="" className='w-[100px] h-[100px] object-center' /></td>
            <td>{item.name}</td>
            <td>₹{item.price}</td>
            <td>{item.quantity}</td>
            <td className='active:scale-[1.2] text-red-700' onClick={() => removeFromCart(item.id)}>
                <i className="ri-delete-bin-line cursor-pointer text-[18px] "></i>
            </td>
        </tr>
    );
};

export default Cart;
