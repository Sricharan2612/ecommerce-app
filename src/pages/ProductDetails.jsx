import React, { useEffect, useRef, useState } from 'react';
//Components and Pages
import CommonSection from '../UI/CommonSection';
import products from '../assets/data/products';
import ProductList from '../UI/ProductList';
//React Router
import { useParams } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/slices/cartSlice';
import { toast } from 'react-toastify';


const ProductDetails = () => {
    //Product Data
    const { id } = useParams();
    const product = products.find((product) => product.id === id);
    const relatedproducts = products.filter((prod) => prod.category === product.category);
    const dispatch = useDispatch();
    //States
    const [tab, setTab] = useState('desc');
    const [rating, setRating] = useState(null);
    //useRef
    const reviewUser = useRef('');
    const reviewMsg = useRef('');

    //Handlers
    const formSubmitHandler = (e) => {
        e.preventDefault();

        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            userName: reviewUserName,
            message: reviewUserMsg,
            rating
        };
        console.log(reviewObj);

        reviewUser.current.value = '';
        reviewMsg.current.value = '';
        setRating(null);

        toast.success('Review submitted');

    };

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: id,
            name: product.productName,
            image: product.imgUrl,
            price: product.price
        }));
        toast.success("Product added sucessfully");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <div>
            <CommonSection title={product.productName} />
            {/* Product Info */}
            <section className='flex justify-center pb-16 sm:pb-24 pt-3 sm:pt-0'>
                <div className='w-[90%] flex flex-col sm:flex-row justify-center gap-10'>
                    <div className='lg:w-[50%] min-w-[280px]'>
                        <img src={product.imgUrl} alt="productImage" className='w-[100%] h-[100%] object-center' />
                    </div>
                    <div className='sm:mt-28'>
                        <h2 className='font-semibold text-3xl text-[#071822] mb-2'>{product.productName}</h2>
                        <div className='flex items-center gap-3 mb-3'>
                            <div className='text-lg text-[#FF8750]'>
                                <span><i className="ri-star-fill"></i></span>
                                <span><i className="ri-star-fill"></i></span>
                                <span><i className="ri-star-fill"></i></span>
                                <span><i className="ri-star-fill"></i></span>
                                <span><i className="ri-star-half-fill"></i></span>
                            </div>
                            <p>({product.avgRating} ratings)</p>
                        </div>
                        <span className='text-2xl font-[500] '>₹{product.price}</span>
                        <p className='mt-3 mb-6'>{product.shortDesc}</p>
                        <button
                            onClick={addToCart}
                            className='bg-[#081B31] text-white px-4 py-2 border-0 rounded cursor-pointer active:scale-[0.95] duration-100'>Add To Cart</button>
                    </div>
                </div>
            </section >

            {/* Product Details and Reviews */}
            <section className=' mb-10 px-8 lg:px-28'>
                <div className='flex items-center gap-12 '>
                    <h6
                        style={{
                            fontWeight: tab === 'desc' ? '600' : '',
                            borderBottom: tab === 'desc' ? '2px solid black' : ''
                        }}
                        onClick={() => setTab('desc')}
                        className='cursor-pointer text-[#071822]'
                    >
                        Description
                    </h6>
                    <h6
                        style={{
                            fontWeight: tab === 'rev' ? '600' : '',
                            borderBottom: tab === 'rev' ? '2px solid black' : ''
                        }}
                        onClick={() => setTab('rev')}
                        className='cursor-pointer text-[#071822]'
                    >
                        Reviews ({product.reviews.length})
                    </h6>
                </div>
                {
                    tab === 'desc'
                        ? (
                            <div className='mt-5'>
                                <p>{product.description}</p>
                            </div>
                        )
                        : (
                            <div className='mt-5'>
                                <ul>
                                    {
                                        product.reviews?.map((review, index) => (
                                            <li key={index}>
                                                <h6 className='font-[600] mb-1'>John Doe</h6>
                                                <span className='text-[#FF8750] font-[600]'>{review.rating} (rating)</span>
                                                <p className='mt-3'>{review.text}</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className='md:w-[70%] m-auto mt-16'>
                                    <h4 className='text-2xl font-[600] mb-6'>Leave your experience</h4>
                                    <form action="" onSubmit={formSubmitHandler}>
                                        <div className='mb-6'>
                                            <input
                                                ref={reviewUser}
                                                type="text"
                                                placeholder='Enter name' className='w-[100%] border border-[#071822] rounded py-[8px] px-[20px] focus:outline-none'
                                                required
                                            />
                                        </div>
                                        <div className='flex items-center gap-5 sm:gap-10 text-[#FF8750] font-[600] mb-6 text-md'>
                                            <span
                                                onClick={() => setRating(1)}
                                                className='flex items-center gap-2 cursor-pointer active:scale-[1.2]'>1
                                                <i className="ri-star-fill"></i>
                                            </span>
                                            <span
                                                onClick={() => setRating(2)}
                                                className='flex items-center gap-2 cursor-pointer active:scale-[1.2]'>2
                                                <i className="ri-star-fill"></i>
                                            </span>
                                            <span
                                                onClick={() => setRating(3)}
                                                className='flex items-center gap-2 cursor-pointer active:scale-[1.2]'>3
                                                <i className="ri-star-fill"></i>
                                            </span>
                                            <span
                                                onClick={() => setRating(4)}
                                                className='flex items-center gap-2 cursor-pointer active:scale-[1.2]'>4
                                                <i className="ri-star-fill"></i>
                                            </span>
                                            <span
                                                onClick={() => setRating(5)}
                                                className='flex items-center gap-2 cursor-pointer active:scale-[1.2]'>5
                                                <i className="ri-star-fill"></i>
                                            </span>
                                        </div>
                                        <div className='mb-6'>
                                            <textarea
                                                ref={reviewMsg}
                                                rows={4}
                                                type="text"
                                                placeholder='Review Message...' className='w-[100%] border border-[#071822] rounded py-[8px] px-[20px] focus:outline-none'
                                                required
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            className='bg-[#081B31] text-white px-4 py-2 border-0 rounded cursor-pointer active:scale-[0.95] duration-100'>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                }

                {/* Related Products */}
                <div className='mt-12 sm:mt-10'>
                    <h2 className='font-[600] text-[20px] mb-5'>You might also like</h2>
                    <ProductList data={relatedproducts} />
                </div>
            </section>


        </div >
    );
};

export default ProductDetails;
