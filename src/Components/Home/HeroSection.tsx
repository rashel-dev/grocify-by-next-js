import React from 'react';
import { LuLeaf, LuSmartphone, LuTruck } from 'react-icons/lu';

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

    return (
        <div className=''>
            
        </div>
    );
};

export default HeroSection;