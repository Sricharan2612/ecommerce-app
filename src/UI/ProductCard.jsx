import React from 'react';
//React Router
import { Link } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/slices/cartSlice';
//Toastify
import { toast } from 'react-toastify';




const ProductCard = ({ product }) => {
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
    return (
        <div className='w-[290px] cursor-pointer shadow-2xl'>
            <div className='overflow-hidden '>
                <img src={product.imgUrl} alt="productImage" className='w-[100%] h-[100%] hover:scale-[1.2] duration-100 aspect-[20/20]' />
            </div>
            <div className='p-2 text-[#071822]'>
                <Link to={`/shop/${product.id}`}>
                    <h3 className='font-semibold text-[1.2rem]]'>
                        {product.productName}
                    </h3>
                </Link>
                <span className='text-[0.9rem]'>
                    {product.category}
                </span>
            </div>
            <div className='flex justify-between items-center p-2 text-[#071822]'>
                <span className='text-[1.3rem] font-[500]'>{`₹${product.price}`}
                </span>
                <span onClick={addToCart} className='active:scale-[1.2] duration-100'>
                    <i className="ri-add-line text-[1.2rem] bg-[#071822] text-white p-[5px] rounded-full"></i>
                </span>
            </div>
        </div>
    );
};

export default ProductCard;
