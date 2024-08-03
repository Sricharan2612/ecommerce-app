import React from 'react';
//React Router
import { Link, Navigate, useNavigate } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/slices/cartSlice';
//Toastify
import { toast } from 'react-toastify';


const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: product.id,
            name: product.productName,
            image: product.imgUrl,
            price: product.price
        }));
        toast.success("Product added sucessfully");
    };

    //Handlers
    const commaSeperatedPrice = (number) => {
        return number?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className='w-[290px] cursor-pointer shadow-2xl pt-4 '>
            <div className='overflow-hidden flex justify-center'>
                <img loading='lazy' src={product.imgUrl} alt="productImage" className='w-[80%] h-[80%] object-contain hover:scale-[1.2] duration-100 aspect-[20/20]' />
            </div>
            <div className='p-2 text-[#071822]'>
                <Link to={`/shop/${product.id}`}>
                    <h3 className='font-semibold text-[1.2rem] mt-2'>
                        {product.productName}
                    </h3>
                </Link>
                <span className='text-[0.9rem]'>
                    {product.category}
                </span>
            </div>
            <div className='flex justify-between items-center p-2 text-[#071822]'>
                <span className='text-[1.3rem] font-[500]'>{`₹${commaSeperatedPrice(product.price)}`}
                </span>
                <span onClick={addToCart} className='active:scale-[1.2] duration-100'>
                    <i className="ri-add-line text-[1.2rem] bg-[#071822] text-white p-[5px] rounded-full"></i>
                </span>
            </div>
        </div >
    );
};

export default ProductCard;
