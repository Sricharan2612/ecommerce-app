import React from 'react';
import commonSection from '../assets/images/commonSection.jpg';
const CommonSection = ({ title }) => {
    return (
        <section className='py-[100px] flex justify-center items-center'
            style={{
                background: `linear-gradient(rgba(0,0,0,0.562), rgba(0,0,0,0.562)), url(${commonSection}) no-repeat center center`,
                backgroundSize: 'cover',
            }}>
            <div>
                <h1 className='text-white font-[600] text-4xl'>{title}</h1>
            </div>
        </section >
    );
};

export default CommonSection;
