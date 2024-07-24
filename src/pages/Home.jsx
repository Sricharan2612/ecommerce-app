import React, { useEffect, useState } from 'react';
//Images
import heroImage from '../assets/images/hero-img.png';
//React router
import { Link } from 'react-router-dom';
//Components
import Services from '../components/Services/Services';
import ProductList from '../UI/ProductList';
import products from '../assets/data/products';

const Home = () => {
    //States
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);
    //UseEffect
    useEffect(() => {
        //Filtered Items
        const filteredTrendingProducts = products.filter(item => item.category === 'chair');
        const filteredBestSalesProducts = products.filter(item => item.category === 'sofa');

        setTrendingProducts(filteredTrendingProducts);
        setBestSalesProducts(filteredBestSalesProducts);

    }, []);
    const currYear = new Date().getFullYear();
    return (
        <div className='homepage'>
            <section className='bg-[#D2E0F6]  w-[100%] h-auto flex flex-col-reverse md:flex-row justify-center items-center gap-3 lg:gap-10 px-6 py-16 '>
                <div className='w-[80%] text-center md:text-left md:w-[50%] lg:w-[40%] text-[#071822]'>
                    <p className='mb-4'>{`Trending product in ${currYear}`}</p>
                    <h1 className='font-semibold text-4xl lg:text-[2.7rem] leading-tight mb-4'>Make Your Interior More Minimalistic & Modern</h1>
                    <p className='mb-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis odio voluptatum alias libero tempora consectetur!</p>
                    <Link to='/shop'>
                        <button type='button' className='bg-[#081B31] text-white px-4 py-2 border-0 rounded-sm cursor-pointer'>SHOP NOW</button>
                    </Link>
                </div>
                <div className='w-auto h-auto'>
                    <img src={heroImage} alt="heroImage" className='w-[100%] h-[100%]' />
                </div>
            </section>
            <Services />
            <section className='trending_products px-6 xl:px-48 mt-24'>
                <h2 className='text-[#071822] text-center mb-4 text-2xl font-bold'>Trending Products</h2>
                <ProductList data={trendingProducts} />
            </section>
            <section className='best_sales px-10 xl:px-48 mt-24'>
                <h2 className='text-[#071822] text-center mb-4 text-2xl font-bold'>Best Sales</h2>
                <ProductList data={bestSalesProducts} />
            </section>

        </div>
    );
};

export default Home;
