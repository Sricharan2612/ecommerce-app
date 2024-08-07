import React from 'react';
import useGetData from '../customHooks/useGetData';
import { db } from '../Firebase/firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
//Loader
import { hourglass } from 'ldrs';

const Users = () => {
    const { data: users, loading } = useGetData("users");
    //Handlers
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id));
        toast.success("User deleted");
    };

    //Loader Initialization
    hourglass.register();

    return (
        <section className='flex justify-center mt-12 mb-24 px-3 md:px-0'>
            <div className='w-[100%] sm:w-[95%]'>
                <h2 className='text-[22px] font-bold text-center mb-10'>Users</h2>
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
                            users.length === 0
                                ? (
                                    <h2 className='text-xl text-center font-semibold py-5'>No user exists!</h2>
                                )
                                : (
                                    <table className='w-[100%] table-fixed text-center text-[#071822] font-semibold' >
                                        <thead className='bg-[#333] text-white'>
                                            <tr className='border-b border-[#071822] '>
                                                <th className='w-[20%] sm:w-auto py-4 sm:py-5'>Image</th>
                                                <th >Username</th>
                                                <th className='truncate'>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index} className='even:bg-[#eee]' >
                                                    <td className='flex justify-center'><img src={user.photoURL} alt="" className='w-[80px] h-[90px] sm:w-[100px] sm:h-[130px] object-contain py-2 aspect-[3/3]' /></td>
                                                    <td className='text-sm sm:text-lg truncate'>{user.displayName}</td>
                                                    <td className='text-sm sm:text-lg truncate'> {user.email}</td>
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
