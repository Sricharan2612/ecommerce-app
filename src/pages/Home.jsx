import React, { useEffect, useState } from 'react';
//Images
import heroImage from '../assets/images/hero-img.png';
import counterImg from '../assets/images/counter-timer-img.png';
//React router
import { Link } from 'react-router-dom';
//Components
import Services from '../components/Services/Services';
import ProductList from '../UI/ProductList';
import products from '../assets/data/products';
import Clock from '../UI/Clock';

const Home = () => {
    //States
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);
    const [mobileProducts, setMobileProducts] = useState([]);
    const [wirelessProducts, setWirelessProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    //UseEffect
    useEffect(() => {
        //Filtered Items
        const filteredTrendingProducts = products.filter(item => item.category === 'chair');
        const filteredBestSalesProducts = products.filter(item => item.category === 'sofa');
        const filteredMobileProducts = products.filter(item => item.category === 'mobile');
        const filteredWirelessProducts = products.filter(item => item.category === 'wireless');
        const filteredPopularProducts = products.filter(item => item.category === 'watch');

        setTrendingProducts(filteredTrendingProducts);
        setBestSalesProducts(filteredBestSalesProducts);
        setMobileProducts(filteredMobileProducts);
        setWirelessProducts(filteredWirelessProducts);
        setPopularProducts(filteredPopularProducts);

    }, []);
    const currYear = new Date().getFullYear();
    return (
        <div className='homepage'>
            {/* Hero Section */}
            <section className='bg-[#D2E0F6]  w-[100%] h-auto flex flex-col md:flex-row justify-center items-center gap-7 lg:gap-10 px-6 py-16 '>
                <div className='w-[100%] text-left md:text-left md:w-[60%] lg:w-[50%] text-[#071822]'>
                    <p className='mb-4'>{`Trending product in ${currYear}`}</p>
                    <h1 className='font-semibold text-3xl md:text-4xl lg:text-[2.7rem] leading-tight mb-4'>Make Your Interior More Minimalistic & Modern</h1>
                    <p className='mb-4 text-sm md:text-md lg:text-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis odio voluptatum alias libero tempora consectetur!</p>
                    <Link to='/shop'>
                        <button type='button' className='bg-[#081B31] text-white px-4 py-2 border-0 rounded cursor-pointer'>SHOP NOW</button>
                    </Link>
                </div>
                <div className='w-auto h-auto '>
                    <img src={heroImage} alt="heroImage" className='w-[100%] h-[100%]' />
                </div>
            </section>

            {/* Services Section */}
            <Services />

            {/* Products Section */}
            <section className='trending_products px-6 xl:px-48 mt-24'>
                <h2 className='text-[#071822] text-center mb-4 text-2xl font-bold'>Trending Products</h2>
                <ProductList data={trendingProducts} />
            </section>
            <section className='best_sales px-10 xl:px-48 mt-24 mb-16'>
                <h2 className='text-[#071822] text-center mb-4 text-2xl font-bold'>Best Sales</h2>
                <ProductList data={bestSalesProducts} />
            </section>

            {/* Timer count */}
            <section className='bg-[#09172E] h-auto sm:h-[300px] flex flex-col-reverse sm:flex-row justify-center text-white items-center px-6 pt-5 p-10'>
                <div className='sm:w-[40%] text-center sm:text-left mt-5 sm:mt-0'>
                    <div className='mb-3 text-center sm:text-start'>
                        <h4 className='mb-1 text-sm sm:text-md'>Limited Offers</h4>
                        <h3 className='text-[1rem] sm:text-[1.3rem]'>Quality Armchair</h3>
                    </div>
                    <Clock />
                    <Link to='/shop'>
                        <button className='px-4 py-2 bg-white text-[#071822] rounded text-[14px] sm:text-[16px] mt-6'>Visit Store</button>
                    </Link>
                </div>
                <div className='hidden sm:flex justify-end items-center '>
                    <img src={counterImg} alt="counterImage" className='w-[80%] h-[100%]' />
                </div>
            </section>

            {/* Product Section */}
            <section className='new_arrivals px-10 xl:px-48 mt-20 mb-16'>
                <h2 className='text-[#071822] text-center mb-4 text-2xl font-bold'>New Arrivals</h2>
                <ProductList data={mobileProducts} />

            </section>
            <section className='wireless_products px-10 xl:px-48 mt-20 mb-16'>
                <h2 className='text-[#071822] text-center mb-4 text-2xl font-bold'>Wireless Products</h2>
                <ProductList data={wirelessProducts} />
            </section>
            <section className='popular_category px-10 xl:px-48 mt-20 mb-16'>
                <h2 className='text-[#071822] text-center mb-4 text-2xl font-bold'>Popular in Category</h2>
                <ProductList data={popularProducts} />
            </section>

        </div>
    );
};

export default Home;
