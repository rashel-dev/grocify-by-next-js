"use client";
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LuLeaf, LuShoppingBasket, LuSmartphone, LuTruck } from 'react-icons/lu';

const HeroSection = () => {

    const slidesData = [
        {
            id: 1,
            icon: <LuLeaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />,
            title: "Fresh Organic Groceries 🥦",
            subtitle: "Farm fresh fruits and vegetables delivered to your doorstep.",
            btnText: "Shop Now",
            bgImage: "https://plus.unsplash.com/premium_photo-1663012860167-220d9d9c8aca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            icon: <LuTruck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />,
            title: "Fast & Reliable Delivery 🚚",
            subtitle: "Get your groceries delivered within 2 hours.",
            btnText: "Order Now",
            bgImage: "https://plus.unsplash.com/premium_photo-1682090260563-191f8160ca48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 3,
            icon: <LuSmartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />,
            title: "Easy Ordering 📱",
            subtitle: "Order your groceries with just a few clicks.",
            btnText: "Get Started",
            bgImage: "https://plus.unsplash.com/premium_photo-1742244062716-9e2bad446fef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className='relative w-[98%] h-[80vh] mx-auto rounded-3xl overflow-hidden shadow-2xl mt-24'>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    exit={{ opacity: 0 }}
                    className='absolute inset-0'
                >
                    <Image src={slidesData[currentIndex].bgImage} alt={slidesData[currentIndex].title} fill priority
                    className='object-cover'
                     />

                    {/* dark overlay */}
                    <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]'></div>

                    
                </motion.div>
            </AnimatePresence>

            {/* content */}
            <div className='absolute inset-0 flex justify-center items-center text-center text-white px-6'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    exit={{ opacity: 0, y: 20 }}
                    className='flex flex-col items-center justify-center max-w-3xl gap-6'
                >   
                    {/* icon */}
                    <div className='bg-white/20 backdrop-blur-sm p-6 rounded-full shadow-2xl'>
                        {slidesData[currentIndex].icon}
                    </div>

                    {/* title */}
                    <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold drop-shadow-lg tracking-tight'>
                        {slidesData[currentIndex].title}
                    </h1>

                    {/* subtitle */}
                    <p className='text-lg sm:text-xl font-medium text-gray-200 drop-shadow-lg'>
                        {slidesData[currentIndex].subtitle}
                    </p>

                    {/* button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='mt-4 bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer'
                    >
                        <LuShoppingBasket className='w-5 h-5' />
                        {slidesData[currentIndex].btnText}
                    </motion.button>



                </motion.div>

            </div>
            
        </div>
    );
};

export default HeroSection;