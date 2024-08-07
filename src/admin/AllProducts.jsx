import React from 'react';
//customHook
import useGetData from '../customHooks/useGetData';
//Firebase
import { db } from '../Firebase/firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
//Firebase Storage
import { storage } from '../Firebase/firebase.config';
import { ref, deleteObject } from 'firebase/storage';
//React toastify
import { toast } from 'react-toastify';
//Loader
import { hourglass } from 'ldrs';


const AllProducts = () => {
    const { data: products, loading } = useGetData("products");

    //Hanlders
    const deleteProduct = async (id, name) => {
        const productImageref = ref(storage, `productImages/${name}`);
        deleteObject(productImageref);
        await deleteDoc(doc(db, 'products', id));
        toast.success('Product deleted!');
    };

    const commaSeperatedPrice = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    //Loader Initialization
    hourglass.register();


    return (
        <section className='flex justify-center mt-12 mb-24 px-3 sm:px-0'>
            <div className='w-[100%] sm:w-[95%]'>
                <h2 className='text-[22px] font-bold text-center mb-10'>Products</h2>
                {
                    loading
                        ? (
                            <div className='flex justify-center items-center my-32'>
                                <l-hourglass
                                    size="75"
                                    speed="1.75"
                                    color='#081B31'
                                ></l-hourglass>
                            </div>
                        )
                        : (
                            products.length === 0
                                ? (
                                    <h2 className='text-xl text-center font-semibold py-5'>No product exists!</h2>
                                )
                                : (
                                    <table className='w-[100%] table-fixed text-center text-[#071822] font-semibold' >
                                        <thead className='bg-[#333] text-white'>
                                            <tr className='border-b border-[#071822]'>
                                                <th className='w-[20%] sm:w-auto py-4 sm:py-5'>Image</th>
                                                <th >Title</th>
                                                <th className='truncate'>Category</th>
                                                <th >Price</th>
                                                <th >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item, index) => (
                                                <tr key={index} className='even:bg-[#eee]' >
                                                    <td className='flex justify-center'><img src={item.imgUrl} alt="" className='sm:w-[150px] sm:h-[150px] object-contain py-2 aspect-[3/3]' /></td>
                                                    <td className='text-sm sm:text-lg truncate ps-3 sm:ps-0 py-4 sm:py-5'>{item.productName}</td>
                                                    <td className='text-sm sm:text-lg truncate py-4 sm:py-5'> {item.category}</td>
                                                    <td className='text-sm sm:text-lg truncate py-4 sm:py-5'>₹{commaSeperatedPrice(item.price)}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => deleteProduct(item.id, item.productName)}
                                                            className='bg-red-600 px-1 py-1 sm:px-3 sm:py-2 rounded text-white active:scale-[1.1] duration-75'>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </ tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                )
                        )
                }
            </div>
        </section >
    );
};

export default AllProducts;
