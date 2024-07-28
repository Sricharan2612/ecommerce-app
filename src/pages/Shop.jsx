import React, { useState } from 'react';
//Components and Pages
import CommonSection from '../UI/CommonSection';
import products from '../assets/data/products';
import ProductList from '../UI/ProductList';

const Shop = () => {
    const [productsData, setProductsData] = useState(products);
    //handlers
    const handleFilter = (e) => {
        const filterValue = e.target.value;

        if (filterValue !== 'Filter By Category') {
            const filteredProducts = products.filter((product) => product.category === filterValue);
            setProductsData(filteredProducts);
        }

    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const searchedProducts = products.filter((product) => product.productName.toLowerCase().includes(searchTerm));
        setProductsData(searchedProducts);
    };
    return (
        <div>
            <CommonSection title="Products" />
            {/* Filter Section */}
            <section className='flex justify-center my-12 md:my-16'>
                <div className='sm:w-[90%] flex justify-between md:flex-row flex-col gap-4 items-center '>
                    <div className='md:w-[30%] text-center '>
                        <select
                            onChange={handleFilter}
                            className='bg-[#081A36] text-white border border-[#081A36] px-4 py-3 rounded'>
                            <option>Filter By Category</option>
                            <option value="sofa">Sofa</option>
                            <option value="mobile">Mobile</option>
                            <option value="chair">Chair</option>
                            <option value="watch">Watch</option>
                            <option value="wireless">Wireless</option>
                        </select>
                    </div>
                    <div className='md:w-[70%] flex justify-end gap-2 px-4 md:px-0'>
                        <div className='border-2 '>
                            <select className='bg-[#081A36] text-white border border-[#081A36] px-3 py-3 rounded'>
                                <option>Sort By</option>
                                <option value="ascending">Low to High</option>
                                <option value="descending">High to Low</option>
                            </select>
                        </div>
                        <div className='flex md:w-[65%] justify-center rounded border-2 border-gray-500'>
                            <input onChange={handleSearch} type="text" placeholder='Search...' className='w-[90%] px-4 border-none outline-none text-[1.1rem]' />
                            <span className='md:w-[10%] flex justify-center items-center pe-3 '>
                                <i className="ri-search-line text-xl cursor-pointer" ></i>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='px-10 mb-16'>
                <div className='text-center'>
                    {
                        productsData.length === 0 ? <h1 className='text-xl'>No products found!</h1> : <ProductList data={productsData} />
                    }
                </div>
            </section>
        </div>
    );
};

export default Shop;
