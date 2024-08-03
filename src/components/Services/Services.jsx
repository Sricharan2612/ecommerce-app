import React from 'react';
//Icons
import 'remixicon/fonts/remixicon.css';
import serviceData from '../../assets/data/serviceData';

const Services = () => {
    return (
        <section className='flex justify-center items-center mt-10 gap-3 sm:gap-6 flex-wrap px-2 sm:px-0'>
            {serviceData.map((data, index) => (
                <div key={index} className='md:w-[20rem] flex justify-center items-center px-2 py-4 gap-2 rounded-md shrink-0 cursor-pointer hover:scale-[1.1] duration-100' style={{ backgroundColor: `${data.bg}` }}>
                    <div className='w-[40px] h-[40px] rounded-[50%] bg-[#05101F] text-white flex justify-center items-center '>
                        <i className={`${data.icon} text-2xl`}></i>
                    </div>
                    <div className='w-[60%]'>
                        <h3 className='font-bold'>{data.title}</h3>
                        <p className='text-[15px]'>{data.subtitle}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Services;
