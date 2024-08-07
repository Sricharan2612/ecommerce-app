import React, { useState } from 'react';
import { toast } from 'react-toastify';
//Firebase
import { db, storage } from '../Firebase/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
//Loader
import { hourglass } from 'ldrs';

const AddProducts = () => {
    const navigate = useNavigate();
    //States
    const [productName, setProductName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);

    //Handlers
    const addProduct = async (e) => {
        e.preventDefault();

        setLoading(true);
        //Adding product to the firestore and storage
        try {
            const docRef = collection(db, 'products');
            const storageRef = ref(storage, `productImages/${productName}`);
            const uploadTask = uploadBytesResumable(storageRef, productImage);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    toast.error(error.message);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    await addDoc(docRef, {
                        productName,
                        shortDesc,
                        description,
                        price,
                        category,
                        imgUrl: downloadURL,
                        avgRating: 0,
                        reviews: []
                    });
                    setLoading(false);
                    toast.success("Product added sucessfully!");
                    navigate('/dashboard/all-products');
                }
            );
        } catch (error) {
            setLoading(false);
            toast.error('Product not added');
        }

    };

    //Loader Initialization
    hourglass.register();

    return (
        <section className='flex justify-center items-center my-12'>
            {
                loading
                    ? (
                        <div className='w-[100%] h-[50vh] flex justify-center items-center font-semibold text-xl'>
                            <l-hourglass
                                size="75"
                                speed="1.75"
                                color='#081B31'
                            ></l-hourglass>
                        </div>
                    )
                    : (
                        <div className='sm:w-[70%] px-8 sm:px-0 '>
                            <h3 className='text-xl font-semibold mb-8'>Add Product</h3>
                            <form action="" onSubmit={addProduct}>
                                <div className='mb-5'>
                                    <label htmlFor="product_name" className='text-[16px] font-bold text-[#ca6248] '>Product title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Product name'
                                        className='w-[100%] px-3 py-2 outline-none border-2 border-[#b1afaf] rounded text-[#081B31]'
                                        id='product_name'
                                        required
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="product_shortDesc" className='text-[16px] font-bold text-[#ca6248] '>Short Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Short desc'
                                        className='w-[100%] px-3 py-2 outline-none border-2 border-[#b1afaf] rounded text-[#081B31]'
                                        id='product_shortDesc'
                                        required
                                        value={shortDesc}
                                        onChange={(e) => setShortDesc(e.target.value)}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="product_description" className='text-[16px] font-bold text-[#ca6248]'>Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Description'
                                        className='w-[100%] px-3 py-2 outline-none border-2 border-[#b1afaf] rounded text-[#081B31]'
                                        id='product_description'
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <div className='flex justify-between items-center'>
                                        <div className='w-[48%]'>
                                            <label htmlFor="product_price" className='text-[16px] font-bold text-[#ca6248] '>Price
                                            </label>
                                            <input
                                                type="text"
                                                placeholder='Price'
                                                className='w-[100%] px-3 py-2 outline-none border-2 border-[#b1afaf] rounded text-[#081B31]'
                                                id='product_price'
                                                required
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className='w-[48%]'>
                                            <label htmlFor="product_category" className='text-[16px] font-bold text-[#ca6248] '>Category
                                            </label>
                                            <select
                                                className='w-[100%] px-3 py-[10px] outline-none border-2 border-[#b1afaf] rounded text-[#081B31]'
                                                id='product_category'
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}>
                                                <option>Select Category</option>
                                                <option value="chair">Chair</option>
                                                <option value="sofa">Sofa</option>
                                                <option value="mobile">Mobile</option>
                                                <option value="watch">Watch</option>
                                                <option value="wireless">Wireless</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="product_image" className='text-[16px] font-bold text-[#ca6248] '>Product Image
                                    </label>
                                    <input
                                        type="file"
                                        className='w-[100%] px-3 py-2 outline-none border-2 border-[#b1afaf] rounded text-[#081B31]'
                                        id='product_image'
                                        required
                                        onChange={(e) => setProductImage(e.target.files[0])}
                                    />
                                </div>



                                <button
                                    type='submit'
                                    className='bg-[#081B31] text-white px-6 py-3 border-0 rounded cursor-pointer active:scale-[0.95] duration-100 font-[600]'>
                                    Add Product
                                </button>
                            </form>
                        </div>
                    )
            }
        </section>
    );
};

export default AddProducts;
