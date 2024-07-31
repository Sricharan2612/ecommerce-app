import React from 'react';
//customHook
import useGetData from '../customHooks/useGetData';

const AllProducts = () => {
    const { data: products } = useGetData("products");
    console.log(products);

    return (
        <section className='flex justify-center my-20'>
            <div className='md:w-[85%] lg:w-[75%]'>
                {
                    // cartItems.length === 0
                    //     ? (
                    //         <h2 className='text-xl text-center font-semibold'>No items in the cart!</h2>
                    //     )
                    //     : (
                    <table className='w-[100%]  table-fixed text-center text-[#071822] font-semibold' >
                        <thead >
                            <tr className='border-b border-[#071822]'>
                                <th className='w-[25%] sm:w-[10%]'>Image</th>
                                <th className='w-[30%] sm:w-auto'>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => (
                                <Tr item={item} key={index} />
                            ))}
                        </tbody>
                    </table>
                    // )
                }
            </div>
        </section>
    );
};


const Tr = ({ item }) => {
    // const dispatch = useDispatch();
    // //Handlers
    // const removeFromCart = (id) => {
    //     dispatch(cartActions.deleteItem(id));
    //     toast.success("Item deleted sucessfully");
    // };
    return (
        <tr className='border-b border-[#071822]'>
            <td ><img src={item.imgUrl} alt="" className='w-[100px] h-[100px] object-center' /></td>
            <td>{item.title}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td className='active:scale-[1.2] text-red-700'>
                <button className='bg-red-600 px-3 py-2 rounded text-white'>Delete</button>
            </td>
        </tr >
    );
};

export default AllProducts;
