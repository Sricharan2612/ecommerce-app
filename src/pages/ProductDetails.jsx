import React, { useEffect, useRef, useState } from 'react';
//Components and Pages
import CommonSection from '../UI/CommonSection';
// import products from '../assets/data/products';
import ProductList from '../UI/ProductList';
//React Router
import { useParams } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/slices/cartSlice';
import { toast } from 'react-toastify';
import useGetData from '../customHooks/useGetData';
//Firebase
import { db } from '../Firebase/firebase.config';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { hourglass } from 'ldrs';


const ProductDetails = () => {
    const dispatch = useDispatch();
    //States
    const [tab, setTab] = useState('desc');
    const [rating, setRating] = useState(null);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    //Product Data
    const { id } = useParams();
    const { data: products } = useGetData('products');
    const relatedproducts = products.filter((prod) => prod.category === product.category);
    const docRef = doc(db, 'products', id);
    //UseEffect
    useEffect(() => {
        const getProduct = async () => {
            // setLoading(true);
            const productDoc = await getDoc(docRef);

            if (productDoc.exists()) {
                // setLoading(false);
                setProduct(productDoc.data());
            } else {
                // setLoading(false);
                toast.warning('No products found!');
            }
        };
        getProduct();
    }, [id, docRef]);

    //useRef
    const reviewUser = useRef('');
    const reviewMsg = useRef('');

    //Handlers
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            name: reviewUserName,
            text: reviewUserMsg,
            rating
        };

        try {
            await updateDoc(docRef, {
                reviews: arrayUnion(reviewObj),
                avgRating: rating
            });
            setLoading(false);
            toast.success('Review submitted sucessfully');
        } catch (error) {
            setLoading(false);
            toast.error('Review not submitted!');
        }

        reviewUser.current = '';
        reviewMsg.current = '';
        setRating(null);



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

    const commaSeperatedPrice = (number) => {
        return number?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    hourglass.register();

    return (
        <div>
            <CommonSection title={product.productName} />
            {/* Product Info */}
            <section className='flex justify-center pb-16 sm:pb-24 pt-3 sm:pt-0 mt-16 sm:mt-20'>
                <div className='w-[90%] flex flex-col sm:flex-row justify-center gap-10 md:gap-28'>
                    <div className='w-auto flex justify-center sm:justify-start'>
                        <div className='w-fit h-[280px] sm:h-[450px]'>
                            <img src={product.imgUrl} alt="productImage" className='w-[100%] h-[100%] object-contain' />
                        </div>
                    </div>
                    <div className='mt-2 md:mt-7 w-[60%]'>
                        <h2 className='font-semibold text-2xl md:text-3xl text-[#071822] mb-2 truncate'>{product.productName}</h2>
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
                        <span className='text-2xl font-[500] '>₹{commaSeperatedPrice(product.price)}</span>
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
                        Reviews ({product.reviews?.length})
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
                                                <div className='flex gap-2'>
                                                    <h6 className='font-[600]'>{review.name}</h6>
                                                    <span className='text-[#FF8750] font-[600]'>{review.rating} (rating)</span>
                                                </div>
                                                <p className='mt-2'>{review.text}</p>
                                            </li>
                                        ))
                                    }
                                </ul>

                                {loading
                                    ? (<div className='flex justify-center items-center my-20'>
                                        <l-hourglass
                                            size="50"
                                            bg-opacity="0.1"
                                            speed="1.75"
                                            color="#081B31"
                                        ></l-hourglass>
                                    </div>
                                    )
                                    : (
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
                                    )
                                }

                            </div >
                        )
                }

                {/* Related Products */}
                <div className='mt-12 sm:mt-10'>
                    <h2 className='font-[600] text-[20px] mb-5'>You might also like</h2>
                    <ProductList data={relatedproducts} />
                </div>
            </section >


        </div >
    );
};

export default ProductDetails;
