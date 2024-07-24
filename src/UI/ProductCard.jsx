import React from 'react';
//React Router
import { Link } from 'react-router-dom';




const ProductCard = ({ product }) => {
    return (
        <div className='max-w-[270px] cursor-pointer shadow-2xl'>
            <div className='overflow-hidden'>
                <img src={product.imgUrl} alt="productImage" className='w-[100%] h-[100%] hover:scale-[1.2] duration-100' />
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
                <span className='active:scale-[1.2] duration-100'>
                    <i className="ri-add-line text-[1.2rem] bg-[#071822] text-white p-[5px] rounded-full"></i>
                </span>
            </div>
        </div>
    );
};

export default ProductCard;
