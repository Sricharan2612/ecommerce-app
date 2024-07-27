import React from 'react';
//components
import ProductCard from './ProductCard';


const ProductList = ({ data }) => {
    return (
        <div className='flex gap-3 flex-wrap justify-center'>
            {data?.map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
        </div>
    );
};

export default ProductList;
