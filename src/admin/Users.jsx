import React from 'react';
import user from '../assets/images/user-icon.png';
import useGetData from '../customHooks/useGetData';
import { db } from '../Firebase/firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Users = () => {
    const { data: users, loading } = useGetData("users");
    //Handlers
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id));
        toast.success("User deleted");
    };
    return (
        <section className='flex justify-center mt-12 mb-24 px-3 md:px-0'>
            <div className='md:w-[85%] lg:w-[75%]'>
                <h2 className='text-[22px] font-bold text-center mb-16'>Users</h2>
                {
                    loading
                        ? (
                            <h2 className='text-xl font-semibold py-5 text-center'>Loading...</h2>
                        )
                        : (
                            users.length === 0
                                ? (
                                    <h2 className='text-xl text-center font-semibold py-5'>No user exists!</h2>
                                )
                                : (
                                    <table className='w-[100%] table-fixed text-center text-[#071822] font-semibold' >
                                        <thead >
                                            <tr className='border-b border-[#071822] '>
                                                <th className='w-[25%] sm:w-[10%]'>Image</th>
                                                <th >Username</th>
                                                <th >Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index} className='border-b border-[#071822] ' >
                                                    <td className='flex justify-center'><img src={user.photoURL} alt="" className='w-[80px] h-[90px] sm:w-[100px] sm:h-[130px] object-contain py-2' /></td>
                                                    <td>{user.displayName}</td>
                                                    <td className='truncate'> {user.email}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => deleteUser(user.uid)}
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
            </div >
        </section >
    );
};

export default Users;
