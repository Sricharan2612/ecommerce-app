import React from 'react';
//components
import ProductCard from './ProductCard';


const ProductList = ({ data }) => {
    return (
        <div className='flex gap-3 flex-wrap justify-center'>
            {data?.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};

export default ProductList;
