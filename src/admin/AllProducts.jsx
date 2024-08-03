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

    return (
        <section className='flex justify-center mt-12 mb-24 px-3 sm:px-0'>
            <div className='md:w-[85%] lg:w-[75%]'>
                <h2 className='text-[22px] font-bold text-center mb-16'>Products</h2>
                {
                    loading
                        ? (<h2 className='text-xl font-semibold py-5 text-center'>Loading...</h2>)
                        : (
                            products.length === 0
                                ? (
                                    <h2 className='text-xl text-center font-semibold py-5'>No product exists!</h2>
                                )
                                : (
                                    <table className='w-[100%] table-fixed text-center text-[#071822] font-semibold' >
                                        <thead >
                                            <tr className='border-b border-[#071822]'>
                                                <th className='w-[25%] sm:w-[10%]'>Image</th>
                                                <th className='w-auto sm:w-[20%]'>Title</th>
                                                <th className='truncate'>Category</th>
                                                <th>Price</th>
                                                <th className='w-auto'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item, index) => (
                                                <tr key={index} className='border-b border-[#071822] my-2' >
                                                    <td ><img src={item.imgUrl} alt="" className='sm:w-[150px] sm:h-[150px] object-contain py-2' /></td>
                                                    <td className='text-sm sm:text-lg'>{item.productName}</td>
                                                    <td className='text-sm sm:text-lg'> {item.category}</td>
                                                    <td className='text-sm sm:text-lg'>₹{commaSeperatedPrice(item.price)}</td>
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
