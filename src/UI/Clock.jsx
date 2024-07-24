import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let interval;
    const countDown = () => {
        const endDate = new Date('Aug 10, 2024').getTime();
        interval = setInterval(() => {
            const currentDate = new Date().getTime();
            const difference = endDate - currentDate;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(difference % (1000 * 60) / 1000);

            if (endDate < 0) {
                clearInterval(interval.current);
            } else {
                setDays(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        });
    };
    // UseEffect
    useEffect(() => {
        countDown();
    }, []);
    return (
        <div className='flex items-center gap-3'>
            <div className='flex items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-xl sm:text-2xl mb-2'>{days}</h1>
                    <h5 className='text-sm sm:text-md'>Days</h5>
                </div>
                <span className='text-xl sm:text-2xl'>:</span>
            </div>
            <div className='flex items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-xl sm:text-2xl mb-2'>{hours}</h1>
                    <h5 className='text-sm sm:text-md'>Hours</h5>
                </div>
                <span className='text-xl sm:text-2xl'>:</span>
            </div>
            <div className='flex items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-xl sm:text-2xl mb-2'>{minutes}</h1>
                    <h5 className='text-sm sm:text-md'>Minutes</h5>
                </div>
                <span className='text-xl sm:text-2xl'>:</span>
            </div>
            <div className='flex items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-xl sm:text-2xl mb-2'>{seconds}</h1>
                    <h5 className='text-sm sm:text-md'>Seconds</h5>
                </div>
            </div>
        </div>
    );
};

export default Clock;
